import BotonGenerico from '@/components/ui2/botonGenerico'
import Encabezado from '@/components/ui2/encabezado'
import { router } from 'expo-router'
import { View, ScrollView, StyleSheet } from 'react-native'

export default function Secciones() {
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <Encabezado title="Secciones" backArrow={false} />
            <ScrollView style={{ display: 'flex', flexDirection: 'column', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60, gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    
                    <BotonGenerico title="Agregar sección" onPress={() => {router.push(`/(app)/AgregarSeccion`)}} bottonStyle={{}} backgroundColor="black" textColor="white" />
                
                <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <View style={styles.botonRowContainer}> 
                        <BotonGenerico title="B03-R01" onPress={() => {router.push(`/(app)/Seccion?id=${2}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <BotonGenerico title="B02-R02" onPress={() => {router.push(`/(app)/Seccion?id=${3}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                    </View>

                    <View style={styles.botonRowContainer}>
                        <BotonGenerico title="A01-R00" onPress={() => {router.push(`/(app)/Seccion?id=${4}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <BotonGenerico title="A02-R00" onPress={() => {router.push(`/(app)/Seccion?id=${5}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                    </View>
                    <View style={styles.botonRowContainer}>
                        <BotonGenerico title="A03-R00" onPress={() => {router.push(`/(app)/Seccion?id=${6}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <BotonGenerico title="C01-R02" onPress={() => {router.push(`/(app)/Seccion?id=${7}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                    </View>
                    <View style={styles.botonRowContainer}>
                        <BotonGenerico title="Sin sección" onPress={() => {router.push(`/(app)/Seccion?id=${1}`)}} bottonStyle={{}} backgroundColor="white" textColor="black" />
                        <View style={{ padding: 10, height: 50, flex: 1, }} />
                    </View>
                    
                </View>

                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    botonRowContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 10 
    }
})