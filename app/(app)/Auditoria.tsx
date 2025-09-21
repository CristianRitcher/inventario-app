import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FilaEscaneoAuditoria from '@/components/ui2/filaEscaneoAuditoria';
import BotonGenerico from '@/components/ui2/botonGenerico';
import Encabezado from '@/components/ui2/encabezado';
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { useScannerInput } from '../../src/utils/scanner';
import { Seccion, ScannedItem, TipoMovimientoEnum, CreateMovimientoDto } from '../../src/types';
import apiService from '../../src/services/api';

export default function AuditoriaScreen() {
    const { user } = useAuth();
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState<number | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const {
        scanInput,
        setScanInput,
        scannedItems,
        addScannedItem,
        removeScannedItem,
        clearScannedItems,
        processScanInput,
    } = useScannerInput();

    useEffect(() => {
        loadSecciones();
    }, []);

    useEffect(() => {
        if (scanInput.length > 4) {
            processScanInput(
                scanInput,
                handleValidCode,
                handleInvalidCode
            );
        }
    }, [scanInput]);

    const loadSecciones = async () => {
        try {
            if (user?.id_bodega) {
                const seccionesData = await apiService.getSecciones(user.id_bodega);
                setSecciones(seccionesData);
            }
        } catch (error) {
            console.error('Error loading secciones:', error);
        }
    };

    const handleValidCode = (scannedItem: ScannedItem) => {
        addScannedItem(scannedItem);
        Alert.alert('Código válido', `Item agregado: ${scannedItem.item?.producto?.nombre || scannedItem.codigo}`);
    };

    const handleInvalidCode = (codigo: string) => {
        // Para auditoría, también agregamos códigos inválidos para registrarlos
        const invalidItem: ScannedItem = {
            codigo,
            cantidad: 1,
            item: undefined,
            seccion: undefined
        };
        addScannedItem(invalidItem);
        Alert.alert('Código no encontrado', `El código ${codigo} se agregará como no encontrado`);
        setScanInput('');
    };

    const handleSubmit = async () => {
        if (!user || scannedItems.length === 0) {
            Alert.alert('Error', 'Debe escanear al menos un código');
            return;
        }

        setIsLoading(true);
        try {
            const movimientoData: CreateMovimientoDto = {
                tipo: TipoMovimientoEnum.AUDITORIA,
                id_usuario: user.id,
                id_bodega: user.id_bodega,
                id_seccion: seccionSeleccionada,
                items: [], // Para auditoría no usamos items individuales
                auditoria: {
                    lista_codigos: scannedItems.map(item => ({
                        codigo: item.codigo,
                        encontrado: !!item.item,
                        producto_nombre: item.item?.producto?.nombre || 'N/A'
                    })),
                    cantidad: scannedItems.length
                }
            };

            await apiService.createMovimiento(movimientoData);
            
            Alert.alert(
                'Éxito',
                'Auditoría registrada correctamente',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            console.error('Error creating audit:', error);
            Alert.alert('Error', 'No se pudo registrar la auditoría');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthGuard>
            <View style={styles.container}>
                <Encabezado title="Auditoría" backArrow={true} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.sectionContainer}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'black'}}>Seleccionar sección:</Text>
                            <Picker 
                                style={styles.picker}
                                selectedValue={seccionSeleccionada}
                                onValueChange={setSeccionSeleccionada}
                            >
                                <Picker.Item label="Sin sección" value={undefined} />
                                {secciones.map(seccion => (
                                    <Picker.Item key={seccion.id} label={seccion.nombre} value={seccion.id} />
                                ))}
                            </Picker>
                        </View>

                        <TextInput 
                            style={styles.input} 
                            placeholder="Escanear código..." 
                            placeholderTextColor="gray"
                            value={scanInput}
                            onChangeText={setScanInput}
                            autoFocus
                        />
                        
                        <View style={{ gap: 10 }}>
                            {scannedItems.map((scannedItem, index) => (
                                <FilaEscaneoAuditoria 
                                    key={scannedItem.codigo}
                                    code={scannedItem.codigo}
                                    productName={scannedItem.item?.producto?.nombre || 'N/A'}
                                    serieable={scannedItem.item?.producto?.es_serial || false}
                                    onRemove={() => removeScannedItem(scannedItem.codigo)}
                                />
                            ))}
                            
                            {scannedItems.length === 0 && (
                                <Text style={styles.noItemsText}>
                                    Escanee códigos para iniciar la auditoría
                                </Text>
                            )}
                        </View>

                        <View style={styles.acciones}>
                            <BotonGenerico 
                                title="Cancelar" 
                                onPress={() => router.back()} 
                                bottonStyle={{}} 
                                backgroundColor="white" 
                                textColor="black" 
                            />
                            <BotonGenerico 
                                title={isLoading ? "Procesando..." : "Confirmar"} 
                                onPress={handleSubmit} 
                                bottonStyle={{}} 
                                backgroundColor="black" 
                                textColor="white"
                                disabled={isLoading}
                            />
                        </View>

                        {isLoading && (
                            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
                        )}
                    </View>
                </ScrollView>
            </View>
        </AuthGuard>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
        gap: 10,
    },
    input: {
        height: 54,
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 1,
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    picker: {
        width: '50%',
        height: '100%',
        color: 'black',
    },
    acciones: {
        flexDirection: 'row',
        gap: 10,
    },
    noItemsText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 20,
    },
});