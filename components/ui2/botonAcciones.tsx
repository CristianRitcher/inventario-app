import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'

export default function BotonAcciones({ title, ruta, }: { title: string, ruta: string }) { 
    const buttonStyle = title === 'Ingresar' || title === 'Egresar' || title === 'Trasladar' || title === 'Estado' || title === 'Eliminar' || title === 'Auditar' || title === 'Secciones'
        ? styles[title as keyof Omit<typeof styles, 'text' | 'boton'>]
        : undefined;  

    const isDisabled = title === 'Estado';
    return (
        <TouchableOpacity style={[styles.boton, buttonStyle]} disabled={isDisabled} onPress={() => router.push(ruta as any)}>
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
        backgroundColor: '#fff',
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '400',
    },
    Ingresar: {
        borderColor: '#7dc272',
    },
    Egresar: {
        borderColor: '#a672c2',
    },
    Trasladar: {
        borderColor: '#f5db76',
    },
    Estado: {
        borderColor: '#72acb3',
        opacity: 0.3,
    },
    Eliminar: {
        borderColor: '#c27572',
    },
    Auditar: {
        borderColor: '#777',
    },
    Secciones: {
        borderColor: '#7296c2',
    },
})