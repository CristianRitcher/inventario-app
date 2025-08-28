import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import BotonGenerico from '@/components/ui2/botonGenerico'
import Encabezado from '@/components/ui2/encabezado'
import { Picker } from '@react-native-picker/picker'

export default function AgregarItem() {

    const { id } = useLocalSearchParams()

    const [serial, setSerial] = useState(true)
    const [en_bodega, setEnBodega] = useState(true)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [codigo, setCodigo] = useState('')
    const [seccion, setSeccion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [cantidad, setCantidad] = useState('')

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
                        <Text style={{ color: 'gray'}}>Seleccionar sección:</Text>
                        <Picker style={styles.picker} >
                            <Picker.Item label="Sin sección" value="1" />
                            <Picker.Item label="A15-R3" value="2" />
                            <Picker.Item label="C12-R0" value="5" />
                        </Picker>
                    </View>

                    {serial ? (
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <View style={styles.itemContainer}>
                                <TextInput placeholder="Ubicación: fuera de la bodega" value={ubicacion} onChangeText={setUbicacion} style={styles.input} placeholderTextColor="gray" />
                            </View>
                            <View style={styles.itemContainer}>
                                <TextInput placeholder="Cantidad: 1" value={cantidad} onChangeText={setCantidad} style={styles.input} placeholderTextColor="gray" editable={false} />
                            </View>
                        </View>

                    ) : (
                        <View style={styles.itemContainer}>
                            <TextInput placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} style={styles.input} placeholderTextColor="gray" />
                        </View>
                    )}

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%' }}>
                        <BotonGenerico title="Cancelar" onPress={() => { router.back() }} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <BotonGenerico title="Guardar" onPress={() => { }} bottonStyle={{}} backgroundColor="#000" textColor="white" />
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