import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import BotonGenerico from '@/components/ui2/botonGenerico';
import Encabezado from '@/components/ui2/encabezado';
import FilaProducto from '@/components/ui2/filaProducto';
import { AuthGuard } from '../../src/components/AuthGuard';
import { Producto } from '../../src/types';
import apiService from '../../src/services/api';

export default function ProductosScreen() {
	const [productos, setProductos] = useState<Producto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchText, setSearchText] = useState('');
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);

	useEffect(() => {
		loadProductos();
	}, []);

	const loadProductos = async (searchQuery?: string, pageNum = 1) => {
		try {
			setIsLoading(pageNum === 1);
			const response = await apiService.getProductos(pageNum, 30, searchQuery);
			
			if (pageNum === 1) {
				setProductos(response.productos);
			} else {
				setProductos(prev => [...prev, ...response.productos]);
			}
			
			setHasMoreData(response.productos.length === 30);
			setPage(pageNum);
		} catch (error) {
			console.error('Error loading productos:', error);
			Alert.alert('Error', 'No se pudieron cargar los productos');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = () => {
		setPage(1);
		loadProductos(searchText, 1);
	};

	const loadMoreData = () => {
		if (hasMoreData && !isLoading) {
			loadProductos(searchText, page + 1);
		}
	};

	return (
		<AuthGuard>
			<View style={styles.container}>
				<Encabezado title="Productos" backArrow={false} />

				<ScrollView 
					style={styles.content}
					onScrollEndDrag={loadMoreData}
				>
					<View style={{ gap: 10 }}>
						<BotonGenerico 
							title="Agregar producto" 
							onPress={() => router.push('/(app)/AgregarProducto')} 
							bottonStyle={{}} 
							backgroundColor="black" 
							textColor="white" 
						/>

						<View style={styles.searchBar}>
							<TextInput 
								placeholder="Buscar (SKU, Serial, Nombre)" 
								style={styles.input}
								value={searchText}
								onChangeText={setSearchText}
								onSubmitEditing={handleSearch}
							/>
							<TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
								<Text style={styles.buttonSearchText}>Buscar</Text>
							</TouchableOpacity>
						</View>

						{isLoading && page === 1 ? (
							<ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
						) : (
							<View style={{ gap: 10 }}>
								{productos.map((producto) => (
									<FilaProducto 
										key={producto.id}
										nombre={producto.nombre} 
										imagen={producto.ruta_imagen ? { uri: producto.ruta_imagen } : require('../../assets/images/icon.png')} 
										productId={producto.id.toString()} 
									/>
								))}
								
								{isLoading && page > 1 && (
									<ActivityIndicator size="small" color="#007AFF" style={{ marginTop: 10 }} />
								)}
								
								{productos.length === 0 && !isLoading && (
									<Text style={styles.noDataText}>No se encontraron productos</Text>
								)}
							</View>
						)}
					</View>
				</ScrollView>
			</View>
		</AuthGuard>
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
		paddingTop: 20,
		paddingBottom: 60,
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
	noDataText: {
		textAlign: 'center',
		color: '#888',
		fontSize: 16,
		marginTop: 20,
	},
});
