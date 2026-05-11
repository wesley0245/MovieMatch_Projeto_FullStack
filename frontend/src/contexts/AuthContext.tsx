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
  // AJUSTE AQUI: O estado inicial agora verifica o localStorage ao carregar
  const [user, setUser] = useState<User | null>(() => {
    const storagedUser = localStorage.getItem('admin:user');
    const storagedToken = localStorage.getItem('admin:token');

    if (storagedUser && storagedToken) {
      // Se achou o token, já deixa a API configurada para as próximas chamadas
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      return JSON.parse(storagedUser);
    }

    return null;
  });

  const navigate = useNavigate();

  async function login(credentials: object) {
    try {
      const response = await api.post('/token/', credentials);
      const { access } = response.data;
      
      // Criamos o objeto do usuário (você pode ajustar os campos conforme seu backend envia)
      const loggedUser: User = { 
        id: "1", 
        username: (credentials as any).username, 
        email: '' 
      };
      
      // Salvamos tudo no localStorage
      localStorage.setItem('admin:token', access);
      localStorage.setItem('admin:user', JSON.stringify(loggedUser));
      
      api.defaults.headers.Authorization = `Bearer ${access}`;
      setUser(loggedUser);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Erro ao entrar. Verifique os dados.');
    }
  }

  function logout() {
    // Limpa apenas os itens do nosso app para ser mais seguro
    localStorage.removeItem('admin:token');
    localStorage.removeItem('admin:user');
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}