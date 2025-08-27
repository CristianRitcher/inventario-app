import Encabezado from '@/components/ui2/encabezado';
import FilaItem from '@/components/ui2/filaItem';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native'

export default function Seccion() {
    const { id } = useLocalSearchParams();
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>

            <Encabezado title="Sección: A00-R00" backArrow={true} />

            <ScrollView style={{ width: '100%' }}>
                <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60, }}>
                    <FilaItem codigo="Cubierta amarilla" cantidad={543} ubicacion="A00-R00" en_bodega={null} serial={false} id_item="1" />
                    <FilaItem codigo="Refrigerador XL" cantidad={1} ubicacion="A00-R00" en_bodega={true} serial={true} id_item="2" />
                    <FilaItem codigo="Caja de herramientas" cantidad={5} ubicacion="A00-R00" en_bodega={null} serial={false} id_item="3" />
                    <FilaItem codigo="Caja de sastreria" cantidad={1} ubicacion="A00-R00" en_bodega={true} serial={true} id_item="4" />
                    <FilaItem codigo="Congelador MSA" cantidad={1} ubicacion="A00-R00" en_bodega={false} serial={true} id_item="5" />
                    <FilaItem codigo="Tornilllo 3/4" cantidad={22} ubicacion="A00-R00" en_bodega={null} serial={false} id_item="6" />
                    <FilaItem codigo="Congelador MSA" cantidad={1} ubicacion="A00-R00" en_bodega={true} serial={true} id_item="7" />
                </View>
            </ScrollView>

        </View>
    )
}