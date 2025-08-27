import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function FilaEscaneo() {
    return (
        <View style={styles.fila}>
            <View style={styles.codeContainer}>
                <Text style={styles.productCode}>738273dfdgf891</Text>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.productName}>Martillo Caterpillar 1234567890</Text>
            </View>
            <TextInput style={styles.inputCantidad} placeholder="0" />
            <View style={styles.seleccionarSeccion}>
                <Text style={styles.seleccionarSeccionText}>A00-R0ddd</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    fila: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        height: 54,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    codeContainer: {
        width: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    productCode: {
        width: '100%',
        fontSize: 10,
        fontWeight: '600',
    },
    nameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 12,
        textAlign: 'left',
    },
    deleteButton: {
        backgroundColor: '#B37070',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    },
    deleteText: {
        fontSize: 12,
        color: 'white',
    },
    inputCantidad: {
        height: 54,
        width: 24,
        textAlign: 'right',
        fontSize: 12,
    },
    seleccionarSeccion: {
        width: 60,
        height: 54,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seleccionarSeccionText: {
        fontSize: 10,
        fontWeight: '600',
    },

   
});