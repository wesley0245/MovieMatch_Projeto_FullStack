import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ReactNode, useContext } from 'react';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard'; 

// Componente simples para proteger rotas
function PrivateRoute({ children }: { children: ReactNode }) {
  const { signed } = useContext(AuthContext);
  return signed ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;