import BotonGenerico from '@/components/ui2/botonGenerico'
import Encabezado from '@/components/ui2/encabezado'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

export default function VerItem() {
    const { id_item } = useLocalSearchParams()
    const [serial, setSerial] = useState(true)
    const [en_bodega, setEnBodega] = useState(true)

    return (
         <View>
            <Encabezado title={`Item: ${id_item}`} backArrow={true} />
            <ScrollView style={{ display: 'flex', flexDirection: 'column', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60, gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                    <View style={styles.itemContainer}>
                        <Text>Nombre: Herramienta de corte</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={{ textAlign: 'center' }}>Descripción: Herramienta de corte de 10 pulgadas y color rojo.</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text>Código: 1234567890</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text>Sección: A00-R00</Text>
                    </View>

                    {serial ? (
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <View style={styles.itemContainer}>
                                <Text>Ubicación: fuera de la bodega</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text>Cantidad: 1</Text>
                            </View>
                        </View>

                    ): (
                        <View style={styles.itemContainer}>
                            <Text>Cantidad: 1</Text>
                        </View>
                    )}

                    <BotonGenerico title="Editar" onPress={() => { router.push(`/EditarItem?id_item=${id_item}`) }} bottonStyle={{}} backgroundColor="#000" textColor="white" />
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
        padding: 5,
        backgroundColor: 'white',
    },
})