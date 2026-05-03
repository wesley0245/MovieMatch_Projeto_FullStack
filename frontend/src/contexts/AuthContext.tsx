import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User } from '../types/index';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  login(credentials: object): Promise<void>;
  logout(): void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Tenta recuperar o usuário e o token que ficaram guardados no navegador
    const storagedUser = localStorage.getItem('@MovieMatch:user');
    const storagedToken = localStorage.getItem('@MovieMatch:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      // Avisa o Axios para usar esse token em todas as chamadas futuras
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  async function login(credentials: object) {
    try {
      // 2. Chama a sua rota /token/ do Django (SimpleJWT)
      const response = await api.post('/token/', credentials);
      
      // No SimpleJWT padrão, ele retorna 'access' e 'refresh'
      const { access } = response.data;

      // Aqui você precisaria de uma rota no seu back para pegar os dados do user,
      // ou podemos simular um objeto user simples para a prova
      const mockUser = { id: 1, username: (credentials as any).username, email: '' };

      localStorage.setItem('@MovieMatch:token', access);
      localStorage.setItem('@MovieMatch:user', JSON.stringify(mockUser));

      api.defaults.headers.Authorization = `Bearer ${access}`;
      setUser(mockUser);
      
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Erro no login! Verifique usuário e senha.');
    }
  }

  function logout() {
    // 3. Limpa tudo ao sair
    localStorage.removeItem('@MovieMatch:token');
    localStorage.removeItem('@MovieMatch:user');
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};