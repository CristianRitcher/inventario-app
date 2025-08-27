import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'

export default function BotonAcciones({ title, ruta, }: { title: string, ruta: string }) { 
    const buttonStyle = title === 'Ingreso' || title === 'Egreso' || title === 'Trasladar' || title === 'Estado' || title === 'Eliminar' || title === 'Auditoria'
        ? styles[title as keyof Omit<typeof styles, 'text' | 'boton'>]
        : undefined;  
    return (
        <TouchableOpacity style={[styles.boton, buttonStyle]} onPress={() => router.push(ruta as any)}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({

    boton: {
        width: '100%',
        flex: 1,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 10,
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '400',
    },
    Ingreso: {
        backgroundColor: '#fff',
        borderColor: '#708FB3',
    },
    Egreso: {
        backgroundColor: '#fff',
        borderColor: '#B39970',
    },
    Trasladar: {
        backgroundColor: '#fff',
        borderColor: '#83B370',
    },
    Estado: {
        backgroundColor: '#fff',
        borderColor: '#AC70B3',
    },
    Eliminar: {
        backgroundColor: '#fff',
        borderColor: '#B37070',
    },
    Auditoria: {
        backgroundColor: '#fff',
        borderColor: '#777',
    },
})