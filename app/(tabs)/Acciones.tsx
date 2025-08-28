import BotonAcciones from '@/components/ui2/botonAcciones';
import Encabezado from '@/components/ui2/encabezado';
import { StyleSheet, View } from 'react-native';



export default function AccionesScreen() {

    return (

        <View style={styles.container}>

            <Encabezado title="Acciones" backArrow={false} />

            <View style={styles.content}>
                <View style={styles.buttonsContainer}>
                    <BotonAcciones title="Ingreso" ruta="/(app)/Accion?accion=ingreso" />
                    <BotonAcciones title="Egreso" ruta="/(app)/Accion?accion=egreso" />
                </View>
                <View style={styles.buttonsContainer}>
                    <BotonAcciones title="Trasladar" ruta="/(app)/Accion?accion=trasladar" />
                    <BotonAcciones title="Estado" ruta="/(app)/Accion?accion=estado" />
                </View>
                <View style={styles.buttonsContainer}>
                    <BotonAcciones title="Eliminar" ruta="/(app)/Accion?accion=eliminar" />
                    <BotonAcciones title="Secciones" ruta="/Secciones" />
                </View>
                <View style={styles.buttonsContainer}>
                    <BotonAcciones title="Auditoria" ruta="/(app)/Auditoria" />
                </View>
            </View>

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
        gap: 20,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
});