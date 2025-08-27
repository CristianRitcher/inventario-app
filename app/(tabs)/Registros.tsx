import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-elements';



export default function RegistrosScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Registros</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.chipContainer} >
                <Chip title="Todos" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                <Chip title="Ingresos" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                <Chip title="Egresos" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                <Chip title="Traslados" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                <Chip title="Eliminados" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                <Chip title="Cambios de estado" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
            </ScrollView>
            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Ingeso 1</Text>
                    <View style={styles.cardSeparator}></View>
                    <Text>Fecha: 2025-01-01 16:00:00</Text>
                    <Text>Responsable: Juan Perez</Text>
                    <Text>Otra información dependiente del registro</Text>
                    <View style={styles.cardSeparator}></View>
                    <View style={styles.itemList}>
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
                        <View style={styles.item}>
                            <Text style={styles.itemNameInfo}>ProductoNombre</Text>
                            <Text style={styles.itemCodeInfo}>Item Serial</Text>
                            <Text style={styles.itemQuantityInfo}>20</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Cambio de estado 1</Text>
                    <View style={styles.cardSeparator}></View>
                    <Text>Fecha: 2025-01-01 16:00:00</Text>
                    <Text>Responsable: juana de Arco</Text>
                    <Text>Otra información dependiente del registro</Text>
                    <View style={styles.cardSeparator}></View>
                    <View style={styles.itemList}>
                        <View style={styles.item}>
                            <Text style={styles.itemNameInfo}>ProductoNombre</Text>
                            <Text style={styles.itemCodeInfo}>Item Serial</Text>
                            <Text style={styles.itemQuantityInfo}>20</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.itemNameInfo}>ProductoNombre es un nombre demaciado largo</Text>
                            <Text style={styles.itemCodeInfo}>000000000000</Text>
                            <Text style={styles.itemQuantityInfo}>200</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.itemNameInfo}>ProductoNombre</Text>
                            <Text style={styles.itemCodeInfo}>Item Serial</Text>
                            <Text style={styles.itemQuantityInfo}>20</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: 120,
        zIndex: 1000,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        paddingLeft: 20,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    chip: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10,
    },
    chipTitle: {
        color: '#000',
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:5,
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
});