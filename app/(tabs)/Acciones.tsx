import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function AccionesScreen() {

    return (

        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Acciones</Text>
            </View>
            <View style={styles.content}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.buttonIngreso, styles.button]} onPress={() => router.push('/(app)/Accion?accion=ingreso')}>
                    <Text style={styles.buttonText}>Ingresos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonEgreso, styles.button]} onPress={() => router.push('/(app)/Accion?accion=egreso')}>
                    <Text style={styles.buttonText}>Egresos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.buttonTrasladar, styles.button]} onPress={() => router.push('/(app)/Accion?accion=trasladar')}>
                    <Text style={styles.buttonText}>Trasladar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonCambiarEstado, styles.button]} onPress={() => router.push('/(app)/Accion?accion=cambiar_estado')}>
                    <Text style={styles.buttonText}>Cambiar estado</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.buttonEliminar, styles.button]} onPress={() => router.push('/(app)/Accion?accion=eliminar')}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonAuditoria, styles.button]} onPress={() => router.push('/(app)/Auditoria')}>
                    <Text style={styles.buttonText}>Auditoria</Text>
                </TouchableOpacity>
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
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        flex: 1,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '400',
    },
    buttonIngreso: {
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        borderColor: '#708FB3',
    },
    buttonEgreso: {
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        borderColor: '#B39970',
    },
    buttonTrasladar: {
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        borderColor: '#83B370',
    },
    buttonCambiarEstado: {
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        borderColor: '#AC70B3',
    },
    buttonEliminar: {
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        borderColor: '#B37070',
    },
    buttonAuditoria: {
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        borderColor: '#8170B3',
    },


});