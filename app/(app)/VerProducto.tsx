import { View, Text, ScrollView, StyleSheet, Image, } from 'react-native'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import FilaItem from '@/components/ui2/filaItem'
import Encabezado from '@/components/ui2/encabezado'
import BotonGenerico from '@/components/ui2/botonGenerico'

export default function VerProducto() {
    const { id } = useLocalSearchParams()
    return (
        <View style={{ height: '100%' }}>
            <Encabezado title={`Producto: ${id}`} backArrow={true} />
            <ScrollView style={styles.content}>
                <View style={styles.productContainer}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.ProductImage} />
                    <View style={styles.productDefaultContainer}>
                        <Text >Nombre: Banderolas Extragrandes con capacidad</Text>
                    </View>
                    <View style={styles.productDefaultContainer}>
                        <Text >Marca: Tecate Premier</Text>
                    </View>
                    <View style={styles.productDefaultContainer}>
                        <Text >SKU: 378278192</Text>
                    </View>
                    <View style={styles.productCountContainer}>
                        <View style={styles.productSubtotalContainer}>
                            <Text >Dentro de bodega:</Text>
                            <Text >10</Text>
                        </View>
                        <View style={styles.productSubtotalContainer}>
                            <Text >Fuera de bodega:</Text>
                            <Text >12</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.productTotalContainer}>
                            <Text >Total:</Text>
                            <Text >22</Text>
                        </View>
                    </View>
                    <View style={styles.productDefaultContainer}>
                        <Text >Material: Aluminio</Text>

                    </View>
                    <View style={styles.messurementsContainer}>
                        <View style={styles.messureContainer}>
                            <Text >MOQ: 3</Text>
                        </View>
                        <View style={styles.messureContainer}>
                            <Text >UM: Caja</Text>
                        </View>
                        <View style={styles.messureContainer}>
                            <Text >UE: 6</Text>
                        </View>
                    </View>

                    <View style={styles.productDefaultContainer}>
                        <Text >Responsable: Beberly Constructora</Text>
                    </View>

                    <View style={styles.actionsContainer}>
                        <BotonGenerico title="Eliminar" onPress={() => { }} bottonStyle={{}} backgroundColor="#B37070" textColor="white" />
                        <BotonGenerico title="Editar" onPress={() => { router.push(`/(app)/EditarProducto?id=${id}`) }} bottonStyle={{}} backgroundColor="#000" textColor="white" />
                        <BotonGenerico title="Nuevo item" onPress={() => { router.push(`/(app)/AgregarItem?id=${id}`) }} bottonStyle={{}} backgroundColor="#000" textColor="white" />
                    </View>

                </View>

                <View style={styles.separator} />

                <View style={styles.itemsContainer}>
                    <FilaItem codigo={"9328192093"} cantidad={1} ubicacion={"Q12-R7"} en_bodega={true} serial={true} id_item={"1"} />
                    <FilaItem codigo={"1234567890"} cantidad={1} ubicacion={"Q12-R7"} en_bodega={false} serial={true} id_item={"2"} />
                    <FilaItem codigo={"0000291822"} cantidad={1} ubicacion={"Q12-R7"} en_bodega={false} serial={true} id_item={"3"} />
                </View>
            </ScrollView>

        </View>
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