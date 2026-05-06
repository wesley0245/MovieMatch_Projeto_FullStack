import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login({ username, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-xl w-96 border border-gray-700">
        <h1 className="text-3xl text-white mb-6 font-bold text-center">MovieMatch</h1>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Usuário"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none"
            onChange={e => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Senha"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}