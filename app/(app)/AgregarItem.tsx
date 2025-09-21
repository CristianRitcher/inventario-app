import { View, Text, ScrollView, StyleSheet, TextInput, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import BotonGenerico from '@/components/ui2/botonGenerico'
import Encabezado from '@/components/ui2/encabezado'
import { Picker } from '@react-native-picker/picker'
import apiService from '@/src/services/api'
import { EstadoEnum, Producto, Seccion, UbicacionEnum } from '@/src/types'
import { useAuth } from '@/src/context/AuthContext'

export default function AgregarItem() {

    const { id } = useLocalSearchParams()
    const { user } = useAuth()
    const [producto, setProducto] = useState<Producto | null>(null)
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [serial, setSerial] = useState(true)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [codigo, setCodigo] = useState('')
    const [seccion, setSeccion] = useState<number | null>(null)
    const [ubicacion, setUbicacion] = useState(true)
    const [cantidad, setCantidad] = useState('')

    const findProducto = async () => {
        const producto = await apiService.getProducto(Number(id))
        setProducto(producto)
        if (producto.es_serial) {
            setSerial(true)
            setCantidad('1')
        } else {
            setSerial(false)
            setCantidad('')
        }
    }

    useEffect(() => {
        loadSecciones();
    }, []);

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

    useEffect(() => {
        findProducto()
    }, [id])

    const handleCreateItem = async () => {
        if (!validateForm()) return;
        const itemData = {
            nombre: nombre.trim(),
            codigo: codigo.trim(),
            ubicacion: ubicacion ? UbicacionEnum.DENTRO : UbicacionEnum.FUERA,
            estado: EstadoEnum.NUEVO,
            observaciones: descripcion.trim(),
            id_seccion: seccion,
            id_producto: Number(id),
            serial: codigo,
            cantidad: serial ? 1 : parseInt(cantidad) || 1,
        }
        const item = await apiService.createItem(itemData);
        Alert.alert('Éxito', 'Item creado correctamente');
        router.back();
    }

    const validateForm = () => {
        if (!nombre.trim()) {
            Alert.alert('Error', 'El nombre es requerido');
            return false;
        }
        if (!descripcion.trim()) {
            Alert.alert('Error', 'La descripción es requerida');
            return false;
            }
        if (!codigo.trim()) {
            Alert.alert('Error', 'El código es requerido');
            return false;
        }
        if (!seccion) {
            Alert.alert('Error', 'La sección es requerida');
            return false;
        }
        if (!serial && (!cantidad || parseInt(cantidad) <= 0)) {
            Alert.alert('Error', 'La cantidad debe ser mayor a 0');
            return false;
        }
        return true;
    }
 

    return (
    
        <View>
            <Encabezado title={`Agregar item`} backArrow={true} />
            <ScrollView style={{ display: 'flex', flexDirection: 'column', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60, gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                    <View style={styles.itemContainer}>
                        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} placeholderTextColor="gray" />
                    </View>

                    <View style={[styles.itemContainer, { height: 200 }]}>
                        <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={styles.input} placeholderTextColor="gray" multiline={true} />
                    </View>

                    <View style={styles.itemContainer}>
                        <TextInput placeholder="Código" value={codigo} onChangeText={setCodigo} style={styles.input} placeholderTextColor="gray" />
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={{ color: 'gray'}}>Sección:</Text>
                        <Picker style={styles.picker} selectedValue={seccion} onValueChange={setSeccion} >
                            <Picker.Item label="Sin sección" value={undefined} />
                            {secciones.map(seccion => (
                                <Picker.Item key={seccion.id} label={seccion.nombre} value={seccion.id} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={{ color: 'gray'}}>¿Está en bodega?</Text>
                        <Switch value={ubicacion} onValueChange={setUbicacion} />
                    </View>

                    {serial ? (
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <View style={styles.itemContainer}>
                                <TextInput placeholder="Cantidad: 1" value={cantidad} onChangeText={setCantidad} style={styles.input} placeholderTextColor="gray" editable={false} keyboardType='numeric'/>
                            </View>
                        </View>

                    ) : (
                        <View style={styles.itemContainer}>
                            <TextInput placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} style={styles.input} placeholderTextColor="gray" editable={true} keyboardType='numeric' />
                        </View>
                    )}

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%' }}>
                        <BotonGenerico title="Cancelar" onPress={() => { router.back() }} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <BotonGenerico title="Guardar" onPress={() => { handleCreateItem() }} bottonStyle={{}} backgroundColor="#000" textColor="white" />
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        backgroundColor: 'white',
        height: 54,
        paddingHorizontal: 10,
    },
    input: {
        height: '100%',
        width: '100%',
        textAlign: 'center',
        color: 'black',
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
})