/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User } from '../types/index';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  login(credentials: object): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function login(credentials: object) {
    try {
      const response = await api.post('/token/', credentials);
      const { access } = response.data;
      
      const loggedUser: User = { id: "1", username: (credentials as any).username, email: '' };
      
      localStorage.setItem('@MovieMatch:token', access);
      setUser(loggedUser);
      api.defaults.headers.Authorization = `Bearer ${access}`;
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao entrar. Verifique os dados.');
    }
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}