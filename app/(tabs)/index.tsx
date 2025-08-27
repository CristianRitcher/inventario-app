import BotonGenerico from '@/components/ui2/botonGenerico';
import Encabezado from '@/components/ui2/encabezado';
import FilaProducto from '@/components/ui2/filaProducto';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function ProductosScreen() {
	return (

		<View style={styles.container}>

			<Encabezado title="Productos" backArrow={false} />

			<ScrollView style={styles.content}>

				<View style={{ gap: 10 }}>

					<BotonGenerico title="Agregar producto" onPress={() => router.push('/(app)/AgregarProducto')} bottonStyle={{}} backgroundColor="black" textColor="white" />

					<View style={styles.searchBar}>
						<TextInput placeholder="Buscar (SKU, Serial, Nombre)" style={styles.input} />
						<TouchableOpacity style={styles.buttonSearch}>
							<Text style={styles.buttonSearchText}>Buscar</Text>
						</TouchableOpacity>
					</View>

					<View style={{ gap: 10 }}>
						<FilaProducto nombre="Refrigeradores 54R-000" imagen={require('../../assets/images/icon.png')} productId={'1'} />
						<FilaProducto nombre="Andamios de madera" imagen={require('../../assets/images/icon.png')} productId={'2'} />
						<FilaProducto nombre="Nevera SScnM" imagen={require('../../assets/images/icon.png')} productId={'3'} />
					</View>

				</View>

			</ScrollView>

		</View>
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
		marginTop: 20,
		marginBottom: 60,
	},
	searchBar: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		color: 'gray',
		padding: 10,
		backgroundColor: 'white',
	},
	buttonSearch: {
		backgroundColor: 'black',
		color: 'white',
		padding: 10,
		width: 100,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonSearchText: {
		color: 'white',
		textAlign: 'center',
	},
});
