import { Image, View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';




export default function PerfilScreen() {
    const logout = () => {
        console.log('logout');
    }
    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Perfíl</Text>
                </View>

                <View style={styles.content}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.avatar} />
                    <View style={styles.separator} />
                    <Text style={styles.text}>Nombre Apellido</Text>
                    <View style={styles.separator} />
                    <Text style={styles.text}>Correo</Text>
                    <View style={styles.separator} />
                    <Text style={styles.text}>Cargo</Text>
                    <View style={styles.separator} />
                    <Text style={styles.text}>Fecha de registro</Text>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.button} onPress={logout}>
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
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
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 100,
        borderWidth: 1,
        marginBottom: 20,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#000',
        marginTop: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },
});