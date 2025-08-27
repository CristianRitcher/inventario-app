import Encabezado from '@/components/ui2/encabezado'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import BotonGenerico from '@/components/ui2/botonGenerico'
import { router } from 'expo-router'

export default function AgregarSeccion() {
    const [fila, setFila] = useState('')
    const [columna, setColumna] = useState('')
    const [rack, setRack] = useState('')
    const [seccion, setSeccion] = useState('')

    useEffect(() => {
        if (fila || columna || rack) {
            setSeccion(`${fila}${columna}-${rack}`)
        } else {
            setSeccion('Nueva sección')
        }
    }, [fila, columna, rack])

    const filas = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const columnas = ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26']
    const racks = ['', 'R01', 'R02', 'R03', 'R04', 'R05', 'R06', 'R07', 'R08', 'R09', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22', 'R23', 'R24', 'R25', 'R26']

    return (
        <View style={{ flex: 1, height: '100%' }}>
            
            <Encabezado title="Agregar sección" backArrow={true} />
            
            <View style={{ height: '100%', width: '100%', paddingHorizontal: 20, gap: 10, paddingTop: 20 }}>
                
                <View style={styles.sectionContainer}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'gray' }}>{seccion}</Text>
                </View>
                
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerText}>Fila</Text>
                    <Picker selectedValue={fila} onValueChange={(itemValue) => setFila(itemValue)} style={styles.picker}>
                        {filas.map((fila) => (
                            <Picker.Item key={fila} label={fila} value={fila} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerText}>Columna</Text>
                    <Picker selectedValue={columna} onValueChange={(itemValue) => setColumna(itemValue)} style={styles.picker}>
                        {columnas.map((columna) => (
                            <Picker.Item key={columna} label={columna} value={columna} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerText}>Rack</Text>
                    <Picker selectedValue={rack} onValueChange={(itemValue) => setRack(itemValue)} style={styles.picker}>
                        {racks.map((rack) => (
                            <Picker.Item key={rack} label={rack} value={rack} />
                        ))}
                    </Picker>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', }}>
                    <BotonGenerico title="Cancelar" onPress={() => router.back()} bottonStyle={{}} backgroundColor="white" textColor="black" />
                    <BotonGenerico title="Agregar sección" onPress={() => { }} bottonStyle={{}} backgroundColor="black" textColor="white" />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    picker: {
        width: '50%',
        height: '100%',
        color: 'black',
    },
    pickerText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
})