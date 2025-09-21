import React, { useState, useEffect } from 'react';
import BotonGenerico from '@/components/ui2/botonGenerico'
import Encabezado from '@/components/ui2/encabezado'
import { router } from 'expo-router'
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { AuthGuard } from '../../src/components/AuthGuard';
import { useAuth } from '../../src/context/AuthContext';
import { Seccion } from '../../src/types';
import apiService from '../../src/services/api';

export default function Secciones() {
    const { user } = useAuth();
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSecciones();
    }, []);

    const loadSecciones = async () => {
        if (!user?.id_bodega) return;
        
        setIsLoading(true);
        try {
            const seccionesData = await apiService.getSecciones(user.id_bodega);
            setSecciones(seccionesData);
        } catch (error) {
            console.error('Error loading secciones:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderSeccionesInPairs = () => {
        const pairs = [];
        for (let i = 0; i < secciones.length; i += 2) {
            const seccion1 = secciones[i];
            const seccion2 = secciones[i + 1];
            
            pairs.push(
                <View key={i} style={styles.botonRowContainer}>
                    <BotonGenerico 
                        title={seccion1.nombre} 
                        onPress={() => {router.push(`/(app)/Seccion?id=${seccion1.id}`)}} 
                        bottonStyle={{}} 
                        backgroundColor="white" 
                        textColor="black" 
                    />
                    {seccion2 ? (
                        <BotonGenerico 
                            title={seccion2.nombre} 
                            onPress={() => {router.push(`/(app)/Seccion?id=${seccion2.id}`)}} 
                            bottonStyle={{}} 
                            backgroundColor="white" 
                            textColor="black" 
                        />
                    ) : (
                        <View style={{ padding: 10, height: 50, flex: 1, }} />
                    )}
                </View>
            );
        }
        return pairs;
    };

    return (
        <AuthGuard>
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Encabezado title="Secciones" backArrow={false} />
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.mainContainer}>
                        <BotonGenerico 
                            title="Agregar sección" 
                            onPress={() => {router.push(`/(app)/AgregarSeccion`)}} 
                            bottonStyle={{}} 
                            backgroundColor="black" 
                            textColor="white" 
                        />
                    
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />
                        ) : secciones.length === 0 ? (
                            <Text style={styles.noDataText}>No hay secciones disponibles</Text>
                        ) : (
                            <View style={styles.seccionesContainer}>
                                {renderSeccionesInPairs()}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </AuthGuard>
    )
}
const styles = StyleSheet.create({
    scrollContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    seccionesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    botonRowContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 10 
    },
    noDataText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 40,
    },
})