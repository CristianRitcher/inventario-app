import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

interface Props {
    code: string;
    productName: string;
    serieable: boolean;
    onRemove?: () => void;
}

export default function FilaEscaneo({code, productName, serieable, onRemove}: Props) {
    const [cantidad, setCantidad] = useState(1);
    return (
        <View style={styles.fila}>
            <View style={styles.codeContainer}>
                <Text style={styles.productCode}>{code}</Text>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.productName}>{productName}</Text>
            </View>
            {serieable ? <TextInput style={[styles.inputCantidad, {color: 'lightgray'}]} keyboardType="numeric" value={cantidad.toString()} onChangeText={(text) => setCantidad(parseInt(text))} editable={false} />
                        : <TextInput style={styles.inputCantidad} keyboardType="numeric" value={cantidad.toString()} onChangeText={(text) => setCantidad(parseInt(text))} editable={true} />}
            <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    productName: {
        fontSize: 12,
        textAlign: 'left',
    },
    inputCantidad: {
        height: 54,
        width: 40,
        textAlign: 'right',
        fontSize: 12,
        paddingRight: 10,
        paddingLeft: 5,
        color: 'gray',
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
    
});