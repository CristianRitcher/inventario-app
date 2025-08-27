import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { router } from 'expo-router';


export default function FilaProducto({ nombre, imagen, productId }: { nombre: string, imagen: ImageSourcePropType, productId: string }) {
    return (
        
        <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            width: '100%',
            borderWidth: 1,
            height: 54,
            backgroundColor: 'white', }} onPress={() => router.push(`/(app)/VerProducto?id=${productId}`)}>
            <Image source={imagen} style={{  
                width: 50,
                height: 50,}} />
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{ fontSize: 12 }}>
                     {nombre}
                </Text>
            </View>
            <View style={{
                backgroundColor: 'black', height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: 'white', }}>{'>'}</Text>
            </View>
        </TouchableOpacity>
    );
}