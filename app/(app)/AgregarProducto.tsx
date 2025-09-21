import React, { useEffect, useState } from 'react';
import Encabezado from "@/components/ui2/encabezado"
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Switch, Text } from "react-native"
import BotonGenerico from "@/components/ui2/botonGenerico"
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import apiService from '../../src/services/api';

export default function AgregarProducto() {
    const { user } = useAuth();
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


    const [isLoading, setIsLoading] = useState(false);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

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

    const handleCreateProduct = async () => {
        if (!validateForm() || !user) return;

        setIsLoading(true);
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
                id_bodega: user.id_bodega,
                es_serial: isSerial,
            };

            const producto = await apiService.createProducto(productoData);

            // Si hay imagen, subirla
            if (image) {
                try {
                    await apiService.uploadProductImage(producto.id, image);
                } catch (imageError) {
                    console.error('Error uploading image:', imageError);
                    // No fallar por la imagen, solo mostrar advertencia
                    Alert.alert('Advertencia', 'El producto se creó pero no se pudo subir la imagen');
                }
            }

            Alert.alert(
                'Éxito',
                'Producto creado correctamente',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            console.error('Error creating product:', error);
            Alert.alert('Error', 'No se pudo crear el producto');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthGuard>
            <View style={{ height: '100%',}}>
                <Encabezado title="Agregar Producto" backArrow={true} />
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
                                placeholder="Marca *" 
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
                                title={isLoading ? "Creando..." : "Crear producto"} 
                                onPress={handleCreateProduct} 
                                bottonStyle={{ width: '100%', height: 54 }} 
                                backgroundColor="black" 
                                textColor="white"
                            />
                        </View>

                        {isLoading && (
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
})