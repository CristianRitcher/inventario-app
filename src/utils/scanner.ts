import { ScannedItem, Item, Seccion } from '../types';
import apiService from '../services/api';

export class ScannerHelper {
  private static scanTimeout: NodeJS.Timeout | null = null;
  private static readonly SCAN_DELAY = 500; // 0.5 segundos

  /**
   * Procesa el input del escáner con validación automática
   * @param input - Código escaneado
   * @param onValidCode - Callback cuando el código es válido
   * @param onInvalidCode - Callback cuando el código es inválido
   */
  static async processScanInput(
    input: string,
    onValidCode: (scannedItem: ScannedItem) => void,
    onInvalidCode: (codigo: string) => void
  ): Promise<void> {
    // Limpiar timeout anterior
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }

    // Solo procesar si el input tiene más de 4 caracteres
    if (input.length <= 4) {
      return;
    }

    // Establecer nuevo timeout
    this.scanTimeout = setTimeout(async () => {
      try {
        const validation = await apiService.validateCode(input);
        
        if (validation.exists && validation.item) {
          const scannedItem: ScannedItem = {
            codigo: input,
            item: validation.item,
            cantidad: validation.item.producto?.es_serial ? 1 : 0,
            seccion: validation.item.seccion,
            isValid: true,
          };
          onValidCode(scannedItem);
        } else {
          onInvalidCode(input);
        }
      } catch (error) {
        console.error('Error validating code:', error);
        onInvalidCode(input);
      }
    }, this.SCAN_DELAY);
  }

  /**
   * Determina automáticamente la sección para un item
   * @param item - Item escaneado
   * @param availableSections - Secciones disponibles
   * @returns Sección asignada o undefined si hay múltiples opciones
   */
  static determineSection(item: Item, availableSections: Seccion[]): Seccion | undefined {
    // Si el item ya tiene sección asignada, usarla
    if (item.seccion) {
      return item.seccion;
    }

    // Si solo hay una sección disponible, asignarla automáticamente
    if (availableSections.length === 1) {
      return availableSections[0];
    }

    // Si hay múltiples secciones, el usuario debe elegir
    return undefined;
  }

  /**
   * Valida si un código es válido para escaneo
   * @param codigo - Código a validar
   * @returns true si es válido
   */
  static isValidCode(codigo: string): boolean {
    return codigo.length > 4 && /^[A-Za-z0-9]+$/.test(codigo);
  }

  /**
   * Formatea un código para mostrar
   * @param codigo - Código a formatear
   * @returns Código formateado
   */
  static formatCode(codigo: string): string {
    return codigo.toUpperCase();
  }

  /**
   * Limpia el timeout de escaneo
   */
  static clearScanTimeout(): void {
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
      this.scanTimeout = null;
    }
  }
}

/**
 * Hook personalizado para manejar el escaneo
 */
export const useScannerInput = () => {
  const [scanInput, setScanInput] = React.useState('');
  const [scannedItems, setScannedItems] = React.useState<ScannedItem[]>([]);

  const addScannedItem = React.useCallback((item: ScannedItem) => {
    setScannedItems(prev => {
      // Evitar duplicados por código
      const exists = prev.find(i => i.codigo === item.codigo);
      if (exists) {
        return prev.map(i => 
          i.codigo === item.codigo 
            ? { ...i, cantidad: i.cantidad + (item.cantidad || 1) }
            : i
        );
      }
      return [...prev, item];
    });
    setScanInput(''); // Limpiar input después de procesar
  }, []);

  const removeScannedItem = React.useCallback((codigo: string) => {
    setScannedItems(prev => prev.filter(item => item.codigo !== codigo));
  }, []);

  const updateScannedItemQuantity = React.useCallback((codigo: string, cantidad: number) => {
    setScannedItems(prev => 
      prev.map(item => 
        item.codigo === codigo 
          ? { ...item, cantidad }
          : item
      )
    );
  }, []);

  const updateScannedItemSection = React.useCallback((codigo: string, seccion: Seccion) => {
    setScannedItems(prev => 
      prev.map(item => 
        item.codigo === codigo 
          ? { ...item, seccion }
          : item
      )
    );
  }, []);

  const clearScannedItems = React.useCallback(() => {
    setScannedItems([]);
  }, []);

  const processScanInput = React.useCallback(
    (input: string, onValidCode: (item: ScannedItem) => void, onInvalidCode: (codigo: string) => void) => {
      ScannerHelper.processScanInput(input, onValidCode, onInvalidCode);
    },
    []
  );

  return {
    scanInput,
    setScanInput,
    scannedItems,
    addScannedItem,
    removeScannedItem,
    updateScannedItemQuantity,
    updateScannedItemSection,
    clearScannedItems,
    processScanInput,
  };
};

// Importar React para el hook
import React from 'react';
