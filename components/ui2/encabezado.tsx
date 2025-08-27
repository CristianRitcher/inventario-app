import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Encabezado({ title, backArrow }: { title: string, backArrow: boolean }) {
    return (
        <View style={{
            zIndex: 999,
            height: 120,
        }}>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%',
                height: 120,
                zIndex: 1000,
                marginBottom: 10,
                paddingHorizontal: 20,
                paddingBottom: 10,
                borderBottomWidth: 1,
            }}>
                {backArrow && (
                    <TouchableOpacity style={{
                        position: 'absolute',
                        left: 20,
                        top: 80,
                    }} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                )}
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 20,
                }}>{title}</Text>
                
            </View>
        </View>
    );
}