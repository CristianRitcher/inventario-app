// Tipos principales del sistema

export interface Bodega {
  id: number;
  nombre: string;
  direccion: string;
}

export interface Seccion {
  id: number;
  nombre: string;
  id_bodega: number;
  bodega?: Bodega;
}

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  cargo: string;
  created_at: string;
  id_bodega: number;
  bodega?: Bodega;
}

export interface Producto {
  id: number;
  nombre: string;
  marca?: string;
  sku: string;
  descripcion?: string;
  ruta_imagen?: string;
  MOQ: number;
  UM?: string;
  UE?: string;
  responsable?: string;
  es_serial: boolean;
  id_bodega: number;
  bodega?: Bodega;
  items?: Item[];
}

export enum UbicacionEnum {
  DENTRO = 'dentro',
  FUERA = 'fuera'
}

export enum EstadoEnum {
  NUEVO = 'nuevo',
  EN_SERVICIO = 'en_servicio',
  DESCOMPUESTO = 'descompuesto',
  VENDIDO = 'vendido',
  OTRO = 'otro'
}

export interface Item {
  id: number;
  id_producto: number;
  nombre?: string;
  serial?: string;
  cantidad: number;
  ubicacion: UbicacionEnum;
  estado: EstadoEnum;
  observaciones?: string;
  id_seccion?: number;
  producto?: Producto;
  seccion?: Seccion;
}

export enum TipoMovimientoEnum {
  INGRESO = 'ingreso',
  EGRESO = 'egreso',
  TRASLADO = 'traslado',
  ELIMINACION = 'eliminacion',
  AUDITORIA = 'auditoria'
}

export interface Movimiento {
  id: number;
  tipo: TipoMovimientoEnum;
  id_usuario: number;
  id_bodega: number;
  id_seccion?: number;
  id_seccion_destino?: number;
  tercero_nombre?: string;
  fecha_hora: string;
  motivo?: string;
  usuario?: Usuario;
  bodega?: Bodega;
  seccion?: Seccion;
  seccionDestino?: Seccion;
  detalles?: MovimientoDetalle[];
  auditoriaDetalles?: AuditoriaDetalle[];
}

export interface MovimientoDetalle {
  id: number;
  id_movimiento: number;
  id_item: number;
  cantidad: number;
  item?: Item;
}

export interface AuditoriaDetalle {
  id: number;
  id_movimiento: number;
  lista_codigos: any;
  cantidad: number;
}

// DTOs para crear movimientos
export interface CreateMovimientoDto {
  tipo: TipoMovimientoEnum;
  id_usuario: number;
  id_bodega: number;
  id_seccion?: number;
  id_seccion_destino?: number;
  tercero_nombre?: string;
  motivo?: string;
  items: Array<{
    id_item: number;
    cantidad: number;
  }>;
  auditoria?: {
    lista_codigos: any;
    cantidad: number;
  };
}

// Respuestas de API
export interface LoginResponse {
  success: boolean;
  usuario?: Usuario;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Para escaneo
export interface ScannedItem {
  codigo: string;
  item?: Item;
  cantidad: number;
  seccion?: Seccion;
  isValid: boolean;
}
