import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScannedItem, Seccion } from '../../src/types';

interface FilaEscaneoAccionProps {
    scannedItem: ScannedItem;
    secciones: Seccion[];
    onQuantityChange: (cantidad: number) => void;
    onSectionChange: (seccion: Seccion) => void;
    onRemove: () => void;
}

export default function FilaEscaneoAccion({
    scannedItem,
    secciones,
    onQuantityChange,
    onSectionChange,
    onRemove
}: FilaEscaneoAccionProps) {
    const [showSectionPicker, setShowSectionPicker] = useState(false);
    const isSerial = scannedItem.item?.producto?.es_serial || false;
    
    const handleQuantityChange = (text: string) => {
        const newQuantity = parseInt(text) || 0;
        if (newQuantity >= 0) {
            onQuantityChange(newQuantity);
        }
    };

    const getDisplayCode = () => {
        return scannedItem.codigo.length > 12 
            ? `${scannedItem.codigo.substring(0, 12)}...`
            : scannedItem.codigo;
    };

    const getDisplayName = () => {
        const productName = scannedItem.item?.producto?.nombre || 'Item desconocido';
        return productName.length > 25
            ? `${productName.substring(0, 25)}...`
            : productName;
    };

    const getSectionDisplay = () => {
        if (scannedItem.seccion) {
            return scannedItem.seccion.nombre.length > 8
                ? `${scannedItem.seccion.nombre.substring(0, 8)}...`
                : scannedItem.seccion.nombre;
        }
        return 'Sin sección';
    };

    return (
        <View style={styles.fila}>
            <View style={styles.codeContainer}>
                <Text style={styles.productCode}>{getDisplayCode()}</Text>
            </View>
            
            <View style={styles.nameContainer}>
                <Text style={styles.productName}>{getDisplayName()}</Text>
            </View>
            
            <TextInput
                style={[
                    styles.inputCantidad,
                    isSerial && { color: 'lightgray' }
                ]}
                keyboardType="numeric"
                value={scannedItem.cantidad.toString()}
                onChangeText={handleQuantityChange}
                editable={!isSerial}
            />
            
            <TouchableOpacity 
                style={styles.seleccionarSeccion}
                onPress={() => setShowSectionPicker(!showSectionPicker)}
            >
                <Text style={styles.seleccionarSeccionText}>
                    {getSectionDisplay()}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
                <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>

            {showSectionPicker && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={scannedItem.seccion?.id}
                        onValueChange={(seccionId) => {
                            const selectedSeccion = secciones.find(s => s.id === seccionId);
                            if (selectedSeccion) {
                                onSectionChange(selectedSeccion);
                            }
                            setShowSectionPicker(false);
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccionar sección..." value={undefined} />
                        {secciones.map(seccion => (
                            <Picker.Item 
                                key={seccion.id} 
                                label={seccion.nombre} 
                                value={seccion.id} 
                            />
                        ))}
                    </Picker>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({

    fila: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        height: 54,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    codeContainer: {
        width: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    productCode: {
        width: '100%',
        fontSize: 10,
        fontWeight: '600',
    },
    nameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 12,
        textAlign: 'left',
    },
    deleteButton: {
        backgroundColor: '#B37070',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    },
    deleteText: {
        fontSize: 12,
        color: 'white',
    },
    inputCantidad: {
        height: 54,
        width: 24,
        textAlign: 'right',
        fontSize: 12,
    },
    seleccionarSeccion: {
        width: 60,
        height: 54,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seleccionarSeccionText: {
        fontSize: 10,
        fontWeight: '600',
    },
    pickerContainer: {
        position: 'absolute',
        top: 54,
        right: 30,
        left: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1000,
    },
    picker: {
        height: 200,
    },
});