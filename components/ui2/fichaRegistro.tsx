import { View, Text, StyleSheet } from 'react-native'
import { Movimiento, TipoMovimientoEnum } from '../../src/types'

interface Props {
    movimiento: Movimiento;
}

export default function FichaRegistro({ movimiento }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTipoDisplayName = (tipo: TipoMovimientoEnum) => {
        switch (tipo) {
            case TipoMovimientoEnum.INGRESO:
                return 'Ingreso';
            case TipoMovimientoEnum.EGRESO:
                return 'Egreso';
            case TipoMovimientoEnum.TRASLADO:
                return 'Traslado';
            case TipoMovimientoEnum.ELIMINACION:
                return 'Eliminación';
            case TipoMovimientoEnum.AUDITORIA:
                return 'Auditoría';
            default:
                return tipo;
        }
    };

    const renderItemDetails = () => {
        if (movimiento.tipo === TipoMovimientoEnum.AUDITORIA) {
            // Para auditorías, mostrar información de la auditoría
            if (movimiento.auditoriaDetalles && movimiento.auditoriaDetalles.length > 0) {
                const auditoria = movimiento.auditoriaDetalles[0];
                return (
                    <View style={styles.item}>
                        <Text style={styles.itemNameInfo}>Códigos escaneados: {auditoria.cantidad}</Text>
                        <Text style={styles.itemCodeInfo}>Auditoría</Text>
                        <Text style={styles.itemQuantityInfo}>{auditoria.cantidad}</Text>
                    </View>
                );
            }
        } else {
            // Para otros tipos, mostrar detalles de items
            return movimiento.detalles?.map((detalle, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.itemNameInfo}>
                        {detalle.item?.producto?.nombre || 'Producto no disponible'}
                    </Text>
                    <Text style={styles.itemCodeInfo}>
                        {detalle.item?.serial || 'N/A'}
                    </Text>
                    <Text style={styles.itemQuantityInfo}>
                        {detalle.cantidad}
                    </Text>
                </View>
            ));
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>
                {getTipoDisplayName(movimiento.tipo)} #{movimiento.id}
            </Text>
            <View style={styles.cardSeparator}></View>
            <Text>Fecha: {formatDate(movimiento.fecha_hora)}</Text>
            <Text>Responsable: {movimiento.usuario?.nombre || 'N/A'}</Text>
            {movimiento.tercero_nombre && (
                <Text>Tercero: {movimiento.tercero_nombre}</Text>
            )}
            {movimiento.motivo && (
                <Text>Motivo: {movimiento.motivo}</Text>
            )}
            {movimiento.seccion && (
                <Text>Sección: {movimiento.seccion.nombre}</Text>
            )}
            {movimiento.seccionDestino && (
                <Text>Sección destino: {movimiento.seccionDestino.nombre}</Text>
            )}
            <View style={styles.cardSeparator}></View>
            <View style={styles.itemList}>
                {renderItemDetails()}
                {(!movimiento.detalles || movimiento.detalles.length === 0) && 
                 movimiento.tipo !== TipoMovimientoEnum.AUDITORIA && (
                    <Text style={styles.noItemsText}>Sin items registrados</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
    itemInfo: {
        color: 'gray',
        width: '30%',
        textAlign: 'center',
    },
    cardSeparator: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 10,
    },
    itemNameInfo: {
        color: 'gray',
        width: '65%',
        textAlign: 'left',
    },
    itemCodeInfo: {
        color: 'gray',
        width: '20%',
        textAlign: 'left',
    },
    itemQuantityInfo: {
        color: 'gray',
        width: '10%',
        textAlign: 'right',
    },
    noItemsText: {
        color: '#888',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 10,
    },
})