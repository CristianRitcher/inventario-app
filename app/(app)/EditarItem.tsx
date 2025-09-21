import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import BotonGenerico from '@/components/ui2/botonGenerico';
import Encabezado from '@/components/ui2/encabezado';
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { Item, Seccion } from '../../src/types';
import apiService from '../../src/services/api';

export default function EditarItem() {
    const { id_item } = useLocalSearchParams();
    const { user } = useAuth();
    const [item, setItem] = useState<Item | null>(null);
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [codigo, setCodigo] = useState<string>('');
    const [seccionId, setSeccionId] = useState<number | undefined>();
    const [cantidad, setCantidad] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (id_item) {
            loadItem();
            loadSecciones();
        }
    }, [id_item]);

    const loadItem = async () => {
        if (!id_item) return;

        setIsLoading(true);
        try {
            const itemData = await apiService.getItem(Number(id_item));
            setItem(itemData);

            // Cargar datos en los campos
            setNombre(itemData.nombre || "");
            setDescripcion(itemData.observaciones || "");
            setCodigo(itemData.serial || "");
            setSeccionId(itemData.id_seccion);
            setCantidad(itemData.cantidad.toString());
        } catch (error) {
            console.error('Error loading item:', error);
            Alert.alert('Error', 'No se pudo cargar el item');
        } finally {
            setIsLoading(false);
        }
    };

    const loadSecciones = async () => {
        if (!user?.id_bodega) return;

        try {
            const seccionesData = await apiService.getSecciones(user.id_bodega);
            setSecciones(seccionesData);
        } catch (error) {
            console.error('Error loading secciones:', error);
        }
    };

    const validateForm = (): boolean => {
        if (!codigo.trim()) {
            Alert.alert('Error', 'El código/serial es requerido');
            return false;
        }
        if (!cantidad || parseInt(cantidad) < 0) {
            Alert.alert('Error', 'La cantidad debe ser mayor o igual a 0');
            return false;
        }
        return true;
    };

    const handleUpdateItem = async () => {
        if (!validateForm() || !item) return;

        setIsSaving(true);
        try {
            const itemData = {
                nombre: nombre.trim() || undefined,
                serial: codigo.trim(),
                observaciones: descripcion.trim() || undefined,
                id_seccion: seccionId,
                cantidad: parseInt(cantidad),
            };

            await apiService.updateItem(item.id, itemData);

            Alert.alert(
                'Éxito',
                'Item actualizado correctamente',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            console.error('Error updating item:', error);
            Alert.alert('Error', 'No se pudo actualizar el item');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !item) {
        return (
            <AuthGuard>
                <View style={{ height: '100%' }}>
                    <Encabezado title={`Editar item: ${id_item}`} backArrow={true} />
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Cargando item...</Text>
                    </View>
                </View>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <View style={{ height: '100%' }}>
                <Encabezado title={`Editar item: ${item.id}`} backArrow={true} />
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.content}>

                        <View style={styles.itemContainer}>
                            <Text style={styles.label}>Nombre:</Text>
                            <TextInput
                                placeholder="Nombre del item"
                                value={nombre}
                                onChangeText={setNombre}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={[styles.itemContainer, { height: 100 }]}>
                            <Text style={styles.label}>Descripción:</Text>
                            <TextInput
                                placeholder="Descripción del item"
                                value={descripcion}
                                onChangeText={setDescripcion}
                                style={styles.input}
                                placeholderTextColor="gray"
                                multiline={true}
                            />
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.label}>Código/Serial *:</Text>
                            <TextInput
                                placeholder="Código único del item"
                                value={codigo}
                                onChangeText={setCodigo}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.label}>Cantidad *:</Text>
                            <TextInput
                                placeholder="Cantidad"
                                value={cantidad}
                                onChangeText={setCantidad}
                                style={styles.input}
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <BotonGenerico
                                title="Cancelar"
                                onPress={() => { router.back() }}
                                bottonStyle={{}}
                                backgroundColor="white"
                                textColor="black"
                            />
                            <BotonGenerico
                                title={isSaving ? "Guardando..." : "Guardar"}
                                onPress={handleUpdateItem}
                                bottonStyle={{}}
                                backgroundColor="#000"
                                textColor="white"
                                disabled={isSaving}
                            />
                        </View>

                        {isSaving && (
                            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
                        )}
                    </View>
                </ScrollView>
            </View>
        </AuthGuard>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
        gap: 10,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        backgroundColor: 'white',
        height: 54,
        padding: 10,
        gap: 5,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    input: {
        flex: 1,
        width: '100%',
        color: 'black',
        fontSize: 16,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
})