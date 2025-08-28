import Encabezado from '@/components/ui2/encabezado';
import BotonGenerico from '@/components/ui2/botonGenerico';
import { Image, View, ScrollView, StyleSheet, Text, } from 'react-native';

export default function PerfilScreen() {
    const logout = () => {
        console.log('logout');
    }
    return (
        <ScrollView>
            <View style={styles.container}>

                <Encabezado title="Perfil" backArrow={false} />

                <View style={styles.content}>

                    <Image source={require('../../assets/images/icon.png')} style={styles.avatar} />

                    <View style={styles.separator} />
                    <Text style={styles.text}>Nombre</Text>

                    <View style={styles.separator} />
                    <Text style={styles.text}>Correo</Text>

                    <View style={styles.separator} />
                    <Text style={styles.text}>Cargo</Text>

                    <View style={styles.separator} />
                    <Text style={styles.text}>Bodega</Text>

                    <View style={styles.separator} />
                    <Text style={styles.text}>Fecha de registro</Text>
                    
                    <View style={styles.separator} />

                    <BotonGenerico title="Cerrar sesión" onPress={logout} bottonStyle={styles.marginTop} backgroundColor="#000" textColor="#fff" /> 
                </View>

            </View>
        </ScrollView>
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
        paddingHorizontal: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 100,
        borderWidth: 1,
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#000',
        marginVertical: 10,
    },
    marginTop: {
        marginTop: 20,
    },
});