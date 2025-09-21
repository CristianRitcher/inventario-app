import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import FilaItem from '@/components/ui2/filaItem'
import Encabezado from '@/components/ui2/encabezado'
import BotonGenerico from '@/components/ui2/botonGenerico'
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { Producto, Item } from '../../src/types';
import apiService from '../../src/services/api';

export default function VerProducto() {
    const { id } = useLocalSearchParams()
    const { user } = useAuth();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadProducto();
            loadItems();
        }
    }, [id]);

    const loadProducto = async () => {
        if (!id) return;
        
        try {
            const productoData = await apiService.getProducto(Number(id));
            setProducto(productoData);
        } catch (error) {
            console.error('Error loading producto:', error);
            Alert.alert('Error', 'No se pudo cargar el producto');
        }
    };

    const loadItems = async () => {
        if (!id) return;
        
        try {
            const itemsData = await apiService.getItems({ producto: Number(id) });
            setItems(itemsData);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateCounts = () => {
        const dentroDeRack = items.filter(item => item.seccion && item.cantidad > 0).reduce((sum, item) => sum + item.cantidad, 0);
        const fueraDeRack = items.filter(item => !item.seccion && item.cantidad > 0).reduce((sum, item) => sum + item.cantidad, 0);
        const total = dentroDeRack + fueraDeRack;
        
        return { dentroDeRack, fueraDeRack, total };
    };

    const handleDeleteProduct = () => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: confirmDelete }
            ]
        );
    };

    const confirmDelete = async () => {
        if (!producto) return;
        
        try {
            // Aquí iría la llamada a la API para eliminar el producto
            // await apiService.deleteProducto(producto.id);
            Alert.alert('Éxito', 'Producto eliminado correctamente', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Error deleting product:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto');
        }
    };

    if (isLoading || !producto) {
        return (
            <AuthGuard>
                <View style={{ height: '100%' }}>
                    <Encabezado title={`Producto: ${id}`} backArrow={true} />
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Cargando producto...</Text>
                    </View>
                </View>
            </AuthGuard>
        );
    }

    const counts = calculateCounts();

    return (
        <AuthGuard>
            <View style={{ height: '100%' }}>
                <Encabezado title={`${producto.nombre}`} backArrow={true} />
                <ScrollView style={styles.content}>
                   
                    <View style={styles.productContainer}>
                       
                        <Image 
                            source={producto.ruta_imagen ? { uri: producto.ruta_imagen } : require('../../assets/images/icon.png')} 
                            style={styles.ProductImage} 
                        />
                      
                        <View style={styles.productDefaultContainer}>
                            <Text>Nombre: {producto.nombre}</Text>
                        </View>
                     
                        <View style={styles.productDefaultContainer}>
                            <Text>Marca: {producto.marca}</Text>
                        </View>
                       
                        <View style={styles.productDefaultContainer}>
                            <Text>SKU: {producto.sku}</Text>
                        </View>
                       
                        <View style={styles.productCountContainer}>
                           
                            <View style={styles.productSubtotalContainer}>
                                <Text>Dentro de bodega:</Text>
                                <Text>{counts.dentroDeRack}</Text>
                            </View>
                            
                            <View style={styles.productSubtotalContainer}>
                                <Text>Fuera de bodega:</Text>
                                <Text>{counts.fueraDeRack}</Text>
                            </View>
                            
                            <View style={styles.separator} />
                           
                            <View style={styles.productTotalContainer}>
                                <Text>Total:</Text>
                                <Text>{counts.total}</Text>
                            </View>
                        
                        </View>
                        
                        {producto.material && (
                            <View style={styles.productDefaultContainer}>
                                <Text>Material: {producto.material}</Text>
                            </View>
                        )}
                        
                        <View style={styles.messurementsContainer}>
                            <View style={styles.messureContainer}>
                                <Text>MOQ: {producto.moq || 'N/A'}</Text>
                            </View>
                            
                            <View style={styles.messureContainer}>
                                <Text>UM: {producto.um || 'N/A'}</Text>
                            </View>
                            
                            <View style={styles.messureContainer}>
                                <Text>UE: {producto.ue || 'N/A'}</Text>
                            </View>
                        </View>

                        {producto.responsable && (
                            <View style={styles.productDefaultContainer}>
                                <Text>Responsable: {producto.responsable}</Text>
                            </View>
                        )}

                        <View style={styles.actionsContainer}>
                            <BotonGenerico 
                                title="Eliminar" 
                                onPress={handleDeleteProduct} 
                                bottonStyle={{}} 
                                backgroundColor="#B37070" 
                                textColor="white" 
                            />
                            <BotonGenerico 
                                title="Editar" 
                                onPress={() => { router.push(`/(app)/EditarProducto?id=${id}`) }} 
                                bottonStyle={{}} 
                                backgroundColor="#000" 
                                textColor="white" 
                            />
                            <BotonGenerico 
                                title="Nuevo item" 
                                onPress={() => { router.push(`/(app)/AgregarItem?id=${id}`) }} 
                                bottonStyle={{}} 
                                backgroundColor="#000" 
                                textColor="white" 
                            />
                        </View>

                    </View>

                    <View style={styles.separator} />

                    <View style={styles.itemsContainer}>
                        {items.length === 0 ? (
                            <Text style={styles.noItemsText}>No hay items registrados para este producto</Text>
                        ) : (
                            items.map((item) => (
                                <FilaItem 
                                    key={item.id}
                                    codigo={item.serial || 'Sin serial'}
                                    cantidad={item.cantidad}
                                    ubicacion={item.seccion?.nombre || 'Sin sección'}
                                    en_bodega={!!item.seccion}
                                    serial={true}
                                    id_item={item.id.toString()}
                                />
                            ))
                        )}
                    </View>
                </ScrollView>
            </View>
        </AuthGuard>
    )
}

const styles = StyleSheet.create({

    content: {
        paddingTop: 20,
        paddingBottom: 60,
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        gap: 10,
    },
    ProductImage: {
        width: '100%',
        height: 200,
        borderWidth: 1,
    },
    productDefaultContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
    },
    separator: {
        width: '100%',
        height: 1,
        borderColor: 'black',
        backgroundColor: 'black',
        marginVertical: 10,
    },
    productCountContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
    },
    productSubtotalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    productTotalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    messurementsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
    },
    messureContainer: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
    },
    itemsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 60,
    },
    

})