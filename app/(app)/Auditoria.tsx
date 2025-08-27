import { router } from 'expo-router';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FilaEscaneoAuditoria from '@/components/ui2/filaEscaneoAuditoria';
import BotonGenerico from '@/components/ui2/botonGenerico';
import Encabezado from '@/components/ui2/encabezado';




export default function AuditoriaScreen() {

    return (
        <View>
            <Encabezado title="Auditoria" backArrow={true} />
            <ScrollView>

                <View style={styles.content}>

                    <View style={styles.sectionContainer}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black'}}>Seleccionar sección:</Text>
                        <Picker style={styles.picker} >
                            <Picker.Item label="A15-R3" value="A15-R3" />
                            <Picker.Item label="C12-R0" value="C12-R0" />
                        </Picker>
                    </View>

                    <TextInput style={styles.input} placeholder="Agregar código" placeholderTextColor="gray"/>
                    <View style={{ gap: 10 }}>
                        <FilaEscaneoAuditoria code="738273dfdgf891" productName="Martillo Caterpillar 1234567890" serieable={true} />  
                        <FilaEscaneoAuditoria code="8gf8uh4eiuefie" productName="Chicles de zanahoria" serieable={false} />
                        <FilaEscaneoAuditoria code="738273dfdgf891" productName="Cornucopia de madera" serieable={true} />
                        <FilaEscaneoAuditoria code="ewf3dffff43444" productName="N/A" serieable={false} />
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
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    picker: {
        width: '40%',
        height: '100%',
    },
    acciones: {
        flexDirection: 'row',
        gap: 10,
    },

});