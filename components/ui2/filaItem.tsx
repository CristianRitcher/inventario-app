import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function FilaItem({ codigo, cantidad, ubicacion, en_bodega, serial, id_item }: { codigo: string, cantidad: number, ubicacion: string, en_bodega: boolean | null, serial: boolean, id_item: string }) {
    return (
        <TouchableOpacity style={{display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 54,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            borderWidth: 1,
            backgroundColor: 'white', }} onPress={() => router.push(`/(app)/VerItem?id_item=${id_item}`)}>
            
            <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 10, }}>
                <Text style={{ fontWeight: 'bold',}}>{codigo}</Text> {/* serial o numero de lote del item */}   
            </View>
            <View style={{height: '100%', width: 40, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{ fontWeight: 'bold',}}>{cantidad}</Text> {/* cantidad de items del lote, seriales es 1 */}
            </View>
            <View style={{ height: '100%', width: 60, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{ fontSize: 12, }}>{ubicacion}</Text> {/* ubicacion del item */}
            </View>
            <View style={{
                height: '100%', width: 10, borderLeftWidth: 1, backgroundColor: serial ? en_bodega ? '#83B370' : '#B37070' : '#ffffff', 
            }}>  {/* #83B370 si esta en bodega, #B37070 si esta fuera de bodega en seriales, si es lote dejar en #ffffff, si es serial no aplica */}
            </View>

            <View style={{ height: '100%', width: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{ fontSize: 20, fontWeight: '500', color: 'white',}}> {'>'} </Text>
            </View>
        </TouchableOpacity>
        
    );
}