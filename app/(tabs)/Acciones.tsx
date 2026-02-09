import React from 'react';
import { StyleSheet, View } from 'react-native';
import BotonAcciones from '@/components/ui2/botonAcciones';
import Encabezado from '@/components/ui2/encabezado';
import { AuthGuard } from '../../src/components/AuthGuard';

export default function AccionesScreen() {
    return (
        <AuthGuard>
            <View style={styles.container}>
                <Encabezado title="Acciones" backArrow={false} />

                <View style={styles.content}>
                    <View style={styles.buttonsContainer}>
                        <BotonAcciones title="Ingresar" ruta="/(app)/Accion?tipo=ingreso" />
                        <BotonAcciones title="Egresar" ruta="/(app)/Accion?tipo=egreso" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <BotonAcciones title="Trasladar" ruta="/(app)/Accion?tipo=traslado" />
                        <BotonAcciones title="Eliminar" ruta="/(app)/Accion?tipo=eliminacion" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <BotonAcciones title="Estado" ruta="/(app)/Accion?tipo=estado" />
                        <BotonAcciones title="Secciones" ruta="/(tabs)/Secciones" />
                    </View>
                    <View style={styles.buttonsContainer} >  
                        <BotonAcciones title="Auditar" ruta="/(app)/Auditoria" />
                    </View>
                </View>
            </View>
        </AuthGuard>
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