import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Usuario,
  Bodega,
  Seccion,
  Producto,
  Item,
  Movimiento,
  LoginResponse,
  CreateMovimientoDto,
  PaginatedResponse,
} from '../types';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:3000/api'; // Cambiar según tu configuración

class ApiService {
  private api: AxiosInstance;
  private currentUser: Usuario | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor para agregar token si existiera
    this.api.interceptors.request.use(
      async (config) => {
        const user = await this.getCurrentUser();
        if (user) {
          // Si tuviéramos tokens, los agregaríamos aquí
          config.headers['X-User-Id'] = user.id.toString();
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor para manejar errores globales
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Autenticación
  async login(correo: string, contrasena: string): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await this.api.post('/usuarios/login', {
      correo,
      contrasena,
    });
    
    if (response.data.success && response.data.usuario) {
      await this.setCurrentUser(response.data.usuario);
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('current_user');
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<Usuario | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const userData = await AsyncStorage.getItem('current_user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }

    return null;
  }

  private async setCurrentUser(user: Usuario): Promise<void> {
    this.currentUser = user;
    await AsyncStorage.setItem('current_user', JSON.stringify(user));
  }

  // Bodegas
  async getBodegas(): Promise<Bodega[]> {
    const response = await this.api.get('/bodegas');
    return response.data;
  }

  // Secciones
  async getSecciones(bodegaId?: number): Promise<Seccion[]> {
    const params = bodegaId ? { bodega: bodegaId } : {};
    const response = await this.api.get('/secciones', { params });
    return response.data;
  }

  async createSeccion(seccion: Partial<Seccion>): Promise<Seccion> {
    const response = await this.api.post('/secciones', seccion);
    return response.data;
  }

  // Productos
  async getProductos(
    page = 1,
    limit = 30,
    search?: string
  ): Promise<{ productos: Producto[]; total: number }> {
    const params: any = { page, limit };
    if (search) params.search = search;
    
    const response = await this.api.get('/productos', { params });
    return response.data;
  }

  async getProducto(id: number): Promise<Producto> {
    const response = await this.api.get(`/productos/${id}`);
    return response.data;
  }

  async getProductoBySku(sku: string): Promise<Producto> {
    const response = await this.api.get(`/productos/sku/${sku}`);
    return response.data;
  }

  async createProducto(producto: Partial<Producto>): Promise<Producto> {
    const response = await this.api.post('/productos', producto);
    return response.data;
  }

  async updateProducto(id: number, producto: Partial<Producto>): Promise<Producto> {
    const response = await this.api.patch(`/productos/${id}`, producto);
    return response.data;
  }

  async uploadProductImage(id: number, imageUri: string): Promise<{ producto: Producto; imageUrl: string }> {
    const formData = new FormData();
    formData.append('imagen', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'imagen.jpg',
    } as any);

    const response = await this.api.post(`/productos/${id}/imagen`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Items
  async getItems(params?: {
    producto?: number;
    seccion?: number;
    search?: string;
  }): Promise<Item[]> {
    const response = await this.api.get('/items', { params });
    return response.data;
  }

  async getItem(id: number): Promise<Item> {
    const response = await this.api.get(`/items/${id}`);
    return response.data;
  }

  async createItem(item: Partial<Item>): Promise<Item> {
    const response = await this.api.post('/items', item);
    return response.data;
  }

  async updateItem(id: number, item: Partial<Item>): Promise<Item> {
    const response = await this.api.patch(`/items/${id}`, item);
    return response.data;
  }

  async validateCode(codigo: string): Promise<{ exists: boolean; item?: Item }> {
    const response = await this.api.get(`/items/validate/${codigo}`);
    return response.data;
  }

  // Movimientos
  async getMovimientos(params?: {
    page?: number;
    limit?: number;
    tipo?: string;
    fechaInicio?: string;
    fechaFin?: string;
    usuario?: number;
    seccion?: number;
  }): Promise<{ movimientos: Movimiento[]; total: number }> {
    const response = await this.api.get('/movimientos', { params });
    return response.data;
  }

  async createMovimiento(movimiento: CreateMovimientoDto): Promise<Movimiento> {
    const response = await this.api.post('/movimientos', movimiento);
    return response.data;
  }

  async getMovimiento(id: number): Promise<Movimiento> {
    const response = await this.api.get(`/movimientos/${id}`);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
