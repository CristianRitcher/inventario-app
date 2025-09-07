import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Usuario } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  login: (correo: string, contrasena: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado al iniciar
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const currentUser = await apiService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking current user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (correo: string, contrasena: string) => {
    try {
      setIsLoading(true);
      const response = await apiService.login(correo, contrasena);
      
      if (response.success && response.usuario) {
        setUser(response.usuario);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.message || 'Credenciales inválidas' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Error de conexión. Intenta nuevamente.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
