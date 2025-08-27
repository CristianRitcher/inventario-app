import { View, Text, StyleSheet } from 'react-native'

export default function FichaRegistro( { id_registro }: { id_registro: number } )  {
    return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ingeso {id_registro}</Text>
                <View style={styles.cardSeparator}></View>
                <Text>Fecha: 2025-01-01 16:00:00</Text>
                <Text>Responsable: Juan Perez</Text>
                <Text>Otra información dependiente del registro</Text>
                <View style={styles.cardSeparator}></View>
                <View style={styles.itemList}>
                    <View style={styles.item}>
                        <Text style={styles.itemNameInfo}>ProductoNombre</Text>
                        <Text style={styles.itemCodeInfo}># Serial / SKU</Text>
                        <Text style={styles.itemQuantityInfo}>20</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemNameInfo}>ProductoNombre</Text>
                        <Text style={styles.itemCodeInfo}>Item Serial</Text>
                        <Text style={styles.itemQuantityInfo}>20</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemNameInfo}>ProductoNombre</Text>
                        <Text style={styles.itemCodeInfo}>Item Serial</Text>
                        <Text style={styles.itemQuantityInfo}>20</Text>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
    itemInfo: {
        color: 'gray',
        width: '30%',
        textAlign: 'center',
    },
    cardSeparator: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 10,
    },
    itemNameInfo: {
        color: 'gray',
        width: '65%',
        textAlign: 'left',
    },
    itemCodeInfo: {
        color: 'gray',
        width: '20%',
        textAlign: 'left',
    },
    itemQuantityInfo: {
        color: 'gray',
        width: '10%',
        textAlign: 'right',
    },
})