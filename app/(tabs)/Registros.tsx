import Encabezado from '@/components/ui2/encabezado';
import FichaRegistro from '@/components/ui2/fichaRegistro';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-elements';



export default function RegistrosScreen() {
    return (
        <View style={styles.container}>

            <Encabezado title="Registros" backArrow={false} />

            <ScrollView style={styles.content}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.chipContainer} >
                    <View style={styles.chipStillContainer}>
                        <Chip title="Todos" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                        <Chip title="Ingresos" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                        <Chip title="Egresos" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                        <Chip title="Traslados" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                        <Chip title="Eliminados" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                        <Chip title="Cambios de estado" buttonStyle={styles.chip} titleStyle={styles.chipTitle} />
                    </View>
                </ScrollView>

                <View style={styles.fichaContainer}>
                    <FichaRegistro id_registro={1} />
                    <FichaRegistro id_registro={2} />
                    <FichaRegistro id_registro={3} />
                    <FichaRegistro id_registro={4} />
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
    },
    fichaContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 10,
        paddingBottom: 10,
    },
    chipContainer: {
        width: '100%',
    },
    chip: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    chipTitle: {
        color: '#000',
    },
    chipStillContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});