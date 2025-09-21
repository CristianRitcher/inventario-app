import React, { useState, useEffect } from 'react';
import BotonGenerico from '@/components/ui2/botonGenerico'
import Encabezado from '@/components/ui2/encabezado'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { Item } from '../../src/types';
import apiService from '../../src/services/api';

export default function VerItem() {
    const { id_item } = useLocalSearchParams()
    const { user } = useAuth();
    const [item, setItem] = useState<Item | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id_item) {
            loadItem();
        }
    }, [id_item]);

    const loadItem = async () => {
        if (!id_item) return;

        setIsLoading(true);
        try {
            const itemData = await apiService.getItem(Number(id_item));
            setItem(itemData);
        } catch (error) {
            console.error('Error loading item:', error);
            Alert.alert('Error', 'No se pudo cargar el item');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteItem = () => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Está seguro de que desea eliminar este item? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: confirmDelete }
            ]
        );
    };

    const confirmDelete = async () => {
        if (!item) return;

        try {
            // Aquí iría la llamada a la API para eliminar el item
            // await apiService.deleteItem(item.id);
            Alert.alert('Éxito', 'Item eliminado correctamente', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Error deleting item:', error);
            Alert.alert('Error', 'No se pudo eliminar el item');
        }
    };

    if (isLoading || !item) {
        return (
            <AuthGuard>
                <View style={{ height: '100%' }}>
                    <Encabezado title={`Item: ${id_item}`} backArrow={true} />
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
                <Encabezado title={`Item: ${item.id || 'Sin código'}`} backArrow={true} />
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.content}>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Nombre:</Text>
                            <Text style={styles.itemValue}>{item.nombre || 'Sin nombre'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Descripción:</Text>
                            <Text style={styles.itemValue}>{item.observaciones || 'Sin descripción'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Código/Serial:</Text>
                            <Text style={styles.itemValue}>{item.serial || 'Sin código'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Producto:</Text>
                            <Text style={styles.itemValue}>{item.producto?.nombre || 'Sin producto'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Sección:</Text>
                            <Text style={styles.itemValue}>{item.seccion?.nombre || 'Sin sección'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Ubicación:</Text>
                            <Text style={styles.itemValue}>{item.ubicacion || 'Sin ubicación'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Estado:</Text>
                            <Text style={styles.itemValue}>{item.estado || 'Sin estado'}</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Cantidad:</Text>
                            <Text style={styles.itemValue}>{item.cantidad}</Text>
                        </View>

                        <View style={styles.actionsContainer}>
                            <BotonGenerico
                                title="Eliminar"
                                onPress={handleDeleteItem}
                                bottonStyle={{}}
                                backgroundColor="#B37070"
                                textColor="white"
                            />
                            <BotonGenerico
                                title="Editar"
                                onPress={() => { router.push(`/(app)/EditarItem?id_item=${id_item}`) }}
                                bottonStyle={{}}
                                backgroundColor="#000"
                                textColor="white"
                            />
                        </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
    },
    actionsContainer: {
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
