import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Encabezado from '@/components/ui2/encabezado';
import FilaEscaneoAccion from '@/components/ui2/filaEscaneoAccion';
import BotonGenerico from '@/components/ui2/botonGenerico';




export default function AccionScreen() { 

    const { accion } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Encabezado title={`Acción: ${accion}`} backArrow={true} />
            <ScrollView>

                <View style={styles.content}>
                    <View style={styles.formContainer}>
                        <Text>Formulario dinamico correspondiente a la acción: {accion}</Text>
                    </View>

                    <TextInput style={styles.input} placeholder="Agregar código" placeholderTextColor="gray" />

                    <View style={{ gap: 10 }}>
                        <FilaEscaneoAccion />
                        <FilaEscaneoAccion />
                    </View>

                    <View style={styles.acciones}>
                        <BotonGenerico title="Cancelar" onPress={() => router.back()} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <BotonGenerico title="Continuar" onPress={() => {}} bottonStyle={{}} backgroundColor="black" textColor="white" />
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
        gap: 10,
    },
    input: {
        height: 54,
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 1,
    },
    acciones: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    },
});