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
                        <BotonAcciones title="Ingreso" ruta="/(app)/Accion?tipo=ingreso" />
                        <BotonAcciones title="Egreso" ruta="/(app)/Accion?tipo=egreso" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <BotonAcciones title="Traslado" ruta="/(app)/Accion?tipo=traslado" />
                        <BotonAcciones title="Eliminación" ruta="/(app)/Accion?tipo=eliminacion" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <BotonAcciones title="Auditoría" ruta="/(app)/Auditoria" />
                        <BotonAcciones title="Secciones" ruta="/(tabs)/Secciones" />
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