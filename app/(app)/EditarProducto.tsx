import React, { useState, useEffect } from 'react';
import Encabezado from "@/components/ui2/encabezado"
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Switch, Text } from "react-native"
import BotonGenerico from "@/components/ui2/botonGenerico"
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from "expo-router";
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { Producto } from '../../src/types';
import apiService from '../../src/services/api';

export default function EditarProducto() {
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [nombre, setNombre] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [sku, setSku] = useState<string>("");
    const [material, setMaterial] = useState<string>("");
    const [moq, setMoq] = useState<string>("");
    const [um, setUm] = useState<string>("");
    const [ue, setUe] = useState<string>("");
    const [responsable, setResponsable] = useState<string>("");
    const [isSerial, setIsSerial] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (id) {
            loadProducto();
        }
    }, [id]);

    const loadProducto = async () => {
        if (!id) return;

        setIsLoading(true);
        try {
            const productoData = await apiService.getProducto(Number(id));
            setProducto(productoData);

            // Cargar datos en los campos
            setNombre(productoData.nombre || "");
            setMarca(productoData.marca || "");
            setSku(productoData.sku || "");
            setMaterial(productoData.material || "");
            setMoq(productoData.moq?.toString() || "");
            setUm(productoData.um || "");
            setUe(productoData.ue || "");
            setResponsable(productoData.responsable || "");
            setIsSerial(productoData.es_serial || false);
            setImage(productoData.ruta_imagen || null);
        } catch (error) {
            console.error('Error loading producto:', error);
            Alert.alert('Error', 'No se pudo cargar el producto');
        } finally {
            setIsLoading(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const validateForm = (): boolean => {
        if (!nombre.trim()) {
            Alert.alert('Error', 'El nombre es requerido');
            return false;
        }
        if (!sku.trim()) {
            Alert.alert('Error', 'El SKU es requerido');
            return false;
        }
        return true;
    };

    const handleUpdateProduct = async () => {
        if (!validateForm() || !producto) return;

        setIsSaving(true);
        try {
            const productoData = {
                nombre: nombre.trim(),
                marca: marca.trim(),
                sku: sku.trim(),
                material: material.trim() || undefined,
                moq: moq ? parseInt(moq) : undefined,
                um: um.trim() || undefined,
                ue: ue.trim() || undefined,
                responsable: responsable.trim() || undefined,
                es_serial: isSerial,
            };

            await apiService.updateProducto(producto.id, productoData);

            // Si hay nueva imagen, subirla
            if (image && image !== producto.ruta_imagen) {
                try {
                    await apiService.uploadProductImage(producto.id, image);
                } catch (imageError) {
                    console.error('Error uploading image:', imageError);
                    Alert.alert('Advertencia', 'El producto se actualizó pero no se pudo actualizar la imagen');
                }
            }

            Alert.alert(
                'Éxito',
                'Producto actualizado correctamente',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            console.error('Error updating product:', error);
            Alert.alert('Error', 'No se pudo actualizar el producto');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !producto) {
        return (
            <AuthGuard>
                <View style={{ height: '100%' }}>
                    <Encabezado title={`Editar Producto ${id}`} backArrow={true} />
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Cargando producto...</Text>
                    </View>
                </View>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <View style={{ height: '100%' }}>
                <Encabezado title={`Editar ${producto.nombre}`} backArrow={true} />
                <ScrollView>
                    <View style={styles.content}>

                        <TouchableOpacity onPress={pickImage} style={styles.imagenPicker}>
                            {image && <Image source={{ uri: image }} style={styles.ProductImage} />}
                            {image ? "" : <Image source={require('../../assets/images/icon.png')} style={styles.ProductImage} />}
                        </TouchableOpacity>

                        <View style={styles.productContainer}>
                            <TextInput
                                placeholder="Nombre *"
                                value={nombre}
                                onChangeText={setNombre}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={styles.productContainer}>
                            <TextInput
                                placeholder="Marca"
                                value={marca}
                                onChangeText={setMarca}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={styles.productContainer}>
                            <TextInput
                                placeholder="SKU *"
                                value={sku}
                                onChangeText={setSku}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={styles.productContainer}>
                            <TextInput
                                placeholder="Material"
                                value={material}
                                onChangeText={setMaterial}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={styles.messurementsContainer}>
                            <View style={styles.messureContainer}>
                                <TextInput
                                    placeholder="MOQ"
                                    value={moq}
                                    onChangeText={setMoq}
                                    style={styles.input}
                                    placeholderTextColor="gray"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.messureContainer}>
                                <TextInput
                                    placeholder="UM"
                                    value={um}
                                    onChangeText={setUm}
                                    style={styles.input}
                                    placeholderTextColor="gray"
                                />
                            </View>
                            <View style={styles.messureContainer}>
                                <TextInput
                                    placeholder="UE"
                                    value={ue}
                                    onChangeText={setUe}
                                    style={styles.input}
                                    placeholderTextColor="gray"
                                />
                            </View>
                        </View>

                        <View style={styles.productContainer}>
                            <TextInput
                                placeholder="Responsable"
                                value={responsable}
                                onChangeText={setResponsable}
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                        </View>

                        <View style={[styles.productContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text>¿Es serial?</Text>
                            <Switch
                                value={isSerial}
                                onValueChange={setIsSerial}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <BotonGenerico
                                title="Cancelar"
                                onPress={() => { router.back() }}
                                bottonStyle={{ width: '100%', height: 54 }}
                                backgroundColor="white"
                                textColor="black"
                            />
                            <BotonGenerico
                                title={isSaving ? "Guardando..." : "Guardar"}
                                onPress={handleUpdateProduct}
                                bottonStyle={{ width: '100%', height: 54 }}
                                backgroundColor="black"
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
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 10,
    },
    input: {
        height: '100%',
        width: '100%',
        textAlign: 'center',
        color: 'black',
    },
    imagenPicker: {
        width: '100%',
        backgroundColor: 'white',
    },
    ProductImage: {
        width: '100%',
        height: 200,
        borderWidth: 1,
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        height: 54,
    },
    separator: {
        width: '100%',
        height: 1,
        borderColor: 'black',
        backgroundColor: 'black',
        marginVertical: 10,
    },
    messurementsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
        height: 54,
    },
    messureContainer: {
        flex: 1,
        borderWidth: 1,
        height: '100%',
        backgroundColor: 'white',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
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