import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Encabezado from '@/components/ui2/encabezado';
import FilaEscaneoAccion from '@/components/ui2/filaEscaneoAccion';
import BotonGenerico from '@/components/ui2/botonGenerico';
import { AuthGuard } from '../../src/components/AuthGuard';
import { useScannerInput } from '../../src/utils/scanner';
import { useAuth } from '../../src/context/AuthContext';
import { TipoMovimientoEnum, Seccion, ScannedItem, CreateMovimientoDto } from '../../src/types';
import apiService from '../../src/services/api';

export default function AccionScreen() {
    const { tipo } = useLocalSearchParams<{ tipo: string }>();
    const { user } = useAuth();
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [seccionOrigen, setSeccionOrigen] = useState<number | undefined>();
    const [seccionDestino, setSeccionDestino] = useState<number | undefined>();
    const [terceroNombre, setTerceroNombre] = useState('');
    const [motivo, setMotivo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        scanInput,
        setScanInput,
        scannedItems,
        addScannedItem,
        removeScannedItem,
        updateScannedItemQuantity,
        updateScannedItemSection,
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
        Alert.alert('Código inválido', `El código ${codigo} no existe en el sistema`);
        setScanInput('');
    };

    const getFormFields = () => {
        switch (tipo as TipoMovimientoEnum) {
            case TipoMovimientoEnum.INGRESO:
                return (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Ingreso de Items</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>Sección destino:</Text>
                            <Picker
                                selectedValue={seccionOrigen}
                                onValueChange={setSeccionOrigen}
                                style={styles.picker}
                            >
                                <Picker.Item label="Seleccionar sección..." value={undefined} />
                                {secciones.map(seccion => (
                                    <Picker.Item key={seccion.id} label={seccion.nombre} value={seccion.id} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Proveedor/Tercero:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={terceroNombre}
                                onChangeText={setTerceroNombre}
                                placeholder="Nombre del proveedor"
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Motivo:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={motivo}
                                onChangeText={setMotivo}
                                placeholder="Motivo del ingreso"
                                multiline
                            />
                        </View>
                    </View>
                );

            case TipoMovimientoEnum.EGRESO:
                return (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Egreso de Items</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>Destinatario:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={terceroNombre}
                                onChangeText={setTerceroNombre}
                                placeholder="Nombre del destinatario"
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Motivo:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={motivo}
                                onChangeText={setMotivo}
                                placeholder="Motivo del egreso"
                                multiline
                            />
                        </View>
                    </View>
                );

            case TipoMovimientoEnum.TRASLADO:
                return (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Traslado de Items</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>Sección origen:</Text>
                            <Picker
                                selectedValue={seccionOrigen}
                                onValueChange={setSeccionOrigen}
                                style={styles.picker}
                            >
                                <Picker.Item label="Seleccionar sección..." value={undefined} />
                                {secciones.map(seccion => (
                                    <Picker.Item key={seccion.id} label={seccion.nombre} value={seccion.id} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Sección destino:</Text>
                            <Picker
                                selectedValue={seccionDestino}
                                onValueChange={setSeccionDestino}
                                style={styles.picker}
                            >
                                <Picker.Item label="Seleccionar sección..." value={undefined} />
                                {secciones.map(seccion => (
                                    <Picker.Item key={seccion.id} label={seccion.nombre} value={seccion.id} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Motivo:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={motivo}
                                onChangeText={setMotivo}
                                placeholder="Motivo del traslado"
                                multiline
                            />
                        </View>
                    </View>
                );

            case TipoMovimientoEnum.ELIMINACION:
                return (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Eliminación de Items</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>Motivo:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={motivo}
                                onChangeText={setMotivo}
                                placeholder="Motivo de la eliminación"
                                multiline
                            />
                        </View>
                    </View>
                );

            default:
                return (
                    <View style={styles.formContainer}>
                        <Text>Tipo de acción no válido</Text>
                    </View>
                );
        }
    };

    const validateForm = (): boolean => {
        if (scannedItems.length === 0) {
            Alert.alert('Error', 'Debe escanear al menos un item');
            return false;
        }

        switch (tipo as TipoMovimientoEnum) {
            case TipoMovimientoEnum.INGRESO:
                if (!seccionOrigen) {
                    Alert.alert('Error', 'Debe seleccionar una sección destino');
                    return false;
                }
                break;
            case TipoMovimientoEnum.TRASLADO:
                if (!seccionOrigen || !seccionDestino) {
                    Alert.alert('Error', 'Debe seleccionar sección origen y destino');
                    return false;
                }
                if (seccionOrigen === seccionDestino) {
                    Alert.alert('Error', 'La sección origen y destino no pueden ser iguales');
                    return false;
                }
                break;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm() || !user) return;

        setIsLoading(true);
        try {
            const movimientoData: CreateMovimientoDto = {
                tipo: tipo as TipoMovimientoEnum,
                id_usuario: user.id,
                id_bodega: user.id_bodega,
                id_seccion: seccionOrigen,
                id_seccion_destino: seccionDestino,
                tercero_nombre: terceroNombre || undefined,
                motivo: motivo || undefined,
                items: scannedItems.map(item => ({
                    id_item: item.item!.id,
                    cantidad: item.cantidad,
                })),
            };

            await apiService.createMovimiento(movimientoData);
            
            Alert.alert(
                'Éxito',
                'Movimiento registrado correctamente',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            console.error('Error creating movement:', error);
            Alert.alert('Error', 'No se pudo registrar el movimiento');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthGuard>
            <View style={styles.container}>
                <Encabezado title={`${tipo?.charAt(0).toUpperCase()}${tipo?.slice(1)}`} backArrow={true} />
                <ScrollView>
                    <View style={styles.content}>
                        {getFormFields()}

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
                                <FilaEscaneoAccion
                                    key={scannedItem.codigo}
                                    scannedItem={scannedItem}
                                    secciones={secciones}
                                    onQuantityChange={(cantidad) => updateScannedItemQuantity(scannedItem.codigo, cantidad)}
                                    onSectionChange={(seccion) => updateScannedItemSection(scannedItem.codigo, seccion)}
                                    onRemove={() => removeScannedItem(scannedItem.codigo)}
                                />
                            ))}
                            
                            {scannedItems.length === 0 && (
                                <Text style={styles.noItemsText}>
                                    Escanee códigos para agregar items
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
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    acciones: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        borderRadius: 8,
        gap: 10,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    field: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        backgroundColor: '#f9f9f9',
    },
    noItemsText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 20,
    },
});