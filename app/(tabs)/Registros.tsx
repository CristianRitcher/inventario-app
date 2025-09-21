import React, { useState, useEffect } from 'react';
import Encabezado from '@/components/ui2/encabezado';
import FichaRegistro from '@/components/ui2/fichaRegistro';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Chip } from 'react-native-elements';
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { Movimiento, TipoMovimientoEnum } from '../../src/types';
import apiService from '../../src/services/api';

export default function RegistrosScreen() {
    const { user } = useAuth();
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtroTipo, setFiltroTipo] = useState<TipoMovimientoEnum | undefined>();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMovimientos(true);
    }, [filtroTipo]);

    const loadMovimientos = async (reset = false) => {
        if (!user) return;
        
        setIsLoading(true);
        try {
            const currentPage = reset ? 1 : page;
            const params: any = {
                page: currentPage,
                limit: 20,
                usuario: user.id,
            };
            
            if (filtroTipo) {
                params.tipo = filtroTipo;
            }

            const response = await apiService.getMovimientos(params);
            
            if (reset) {
                setMovimientos(response.movimientos);
                setPage(1);
            } else {
                setMovimientos(prev => [...prev, ...response.movimientos]);
            }
            
            setHasMore(response.movimientos.length === 20);
            if (!reset) setPage(prev => prev + 1);
        } catch (error) {
            console.error('Error loading movimientos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterPress = (tipo?: TipoMovimientoEnum) => {
        setFiltroTipo(tipo);
    };

    const loadMore = () => {
        if (!isLoading && hasMore) {
            loadMovimientos(false);
        }
    };

    const getChipStyle = (tipo?: TipoMovimientoEnum) => {
        return filtroTipo === tipo 
            ? { ...styles.chip, backgroundColor: '#007AFF' }
            : styles.chip;
    };

    const getChipTitleStyle = (tipo?: TipoMovimientoEnum) => {
        return filtroTipo === tipo 
            ? { ...styles.chipTitle, color: 'white' }
            : styles.chipTitle;
    };

    return (
        <AuthGuard>
            <View style={styles.container}>
                <Encabezado title="Registros" backArrow={false} />

                <ScrollView style={styles.content}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.chipContainer} >
                        <View style={styles.chipStillContainer}>
                            <Chip 
                                title="Todos" 
                                buttonStyle={getChipStyle(undefined)} 
                                titleStyle={getChipTitleStyle(undefined)}
                                onPress={() => handleFilterPress(undefined)}
                            />
                            <Chip 
                                title="Ingresos" 
                                buttonStyle={getChipStyle(TipoMovimientoEnum.INGRESO)} 
                                titleStyle={getChipTitleStyle(TipoMovimientoEnum.INGRESO)}
                                onPress={() => handleFilterPress(TipoMovimientoEnum.INGRESO)}
                            />
                            <Chip 
                                title="Egresos" 
                                buttonStyle={getChipStyle(TipoMovimientoEnum.EGRESO)} 
                                titleStyle={getChipTitleStyle(TipoMovimientoEnum.EGRESO)}
                                onPress={() => handleFilterPress(TipoMovimientoEnum.EGRESO)}
                            />
                            <Chip 
                                title="Traslados" 
                                buttonStyle={getChipStyle(TipoMovimientoEnum.TRASLADO)} 
                                titleStyle={getChipTitleStyle(TipoMovimientoEnum.TRASLADO)}
                                onPress={() => handleFilterPress(TipoMovimientoEnum.TRASLADO)}
                            />
                            <Chip 
                                title="Eliminados" 
                                buttonStyle={getChipStyle(TipoMovimientoEnum.ELIMINACION)} 
                                titleStyle={getChipTitleStyle(TipoMovimientoEnum.ELIMINACION)}
                                onPress={() => handleFilterPress(TipoMovimientoEnum.ELIMINACION)}
                            />
                            <Chip 
                                title="Auditorías" 
                                buttonStyle={getChipStyle(TipoMovimientoEnum.AUDITORIA)} 
                                titleStyle={getChipTitleStyle(TipoMovimientoEnum.AUDITORIA)}
                                onPress={() => handleFilterPress(TipoMovimientoEnum.AUDITORIA)}
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.fichaContainer}>
                        {movimientos.length === 0 && !isLoading ? (
                            <Text style={styles.noDataText}>No hay registros para mostrar</Text>
                        ) : (
                            movimientos.map((movimiento) => (
                                <FichaRegistro key={movimiento.id} movimiento={movimiento} />
                            ))
                        )}
                        
                        {isLoading && (
                            <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
                        )}
                        
                        {!isLoading && hasMore && movimientos.length > 0 && (
                            <View style={styles.loadMoreContainer}>
                                <Chip
                                    title="Cargar más"
                                    buttonStyle={styles.loadMoreButton}
                                    titleStyle={styles.loadMoreText}
                                    onPress={loadMore}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
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
    noDataText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 40,
    },
    loadMoreContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loadMoreButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    loadMoreText: {
        color: '#333',
    },
});