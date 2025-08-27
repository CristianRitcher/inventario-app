import { router } from 'expo-router';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';




export default function AccionScreen() { 

    const { accion } = useLocalSearchParams();

    return (
        <View>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.title}>Acción: {accion}</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.formContainer}>
                        <Text>Formulario dinamico correspondiente a la acción: {accion}</Text>
                    </View>

                    <TextInput style={styles.input} placeholder="Agregar código" />

                    <View style={styles.fila}>
                        <View style={styles.productCodeContainer}>
                            <Text style={styles.productCode}>738273891</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productName}>Andamios de madera</Text>
                        </View>
                        <TextInput style={styles.inputCantidad} placeholder="1" />
                        <View style={styles.seleccionarSeccion}>
                            <Text style={styles.seleccionarSeccionText}>A00-R0</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fila}>
                        <View style={styles.productCodeContainer}>
                            <Text style={styles.productCode}>738273891</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productName}>Martillo Caterpillar 1234567890</Text>
                        </View>
                        <TextInput style={styles.inputCantidad} placeholder="1" />
                        <View style={styles.seleccionarSeccion}>
                            <Text style={styles.seleccionarSeccionText}>A00-R0</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fila}>
                        <View style={styles.productCodeContainer}>
                            <Text style={styles.productCode}>322273891</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productName}>Andamios de madera</Text>
                        </View>
                        <TextInput style={styles.inputCantidad} placeholder="1" />
                        <View style={styles.seleccionarSeccion}>
                            <Text style={styles.seleccionarSeccionText}>A00-R0</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.acciones}>
                        <TouchableOpacity style={styles.buttonCancelar} onPress={() => router.back()}>
                            <Text style={styles.buttonCancelarText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContinuar}>
                            <Text style={styles.buttonContinuarText}>Continuar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </View>
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
    input: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    productNameContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productCodeContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 12,
        textAlign: 'center',
    },
    fila: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        borderWidth: 1,
        height: 54,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    inputCantidad: {
        height: 54,
        width: 40,
        textAlign: 'center',
        fontSize: 12,
    },
    deleteButton: {
        backgroundColor: '#B37070',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    deleteText: {
        fontSize: 16,
        color: 'white',
    },
    productCode: {
        fontSize: 12,
        fontWeight: '600',
    },
    acciones: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        gap: 10,
    },
    buttonContinuar: {
        height: 50,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCancelar: {
        height: 50,
        paddingHorizontal: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonContinuarText: {
        fontSize: 14,
        color: '#fff',
    },
    buttonCancelarText: {
        fontSize: 14,
        color: '#000',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    seleccionarSeccion: {
        width: 60,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seleccionarSeccionText: {
        fontSize: 12,
        fontWeight: '600',
    },
});