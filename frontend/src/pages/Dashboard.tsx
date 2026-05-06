import { useEffect, useState } from 'react';
import api from '../services/api';
import { Filme } from '../types/index'; // Lembra de adicionar a interface Filme no seu types/index.ts

export function Dashboard() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        // Certifique-se de que a rota no Django é /filmes/
        const response = await api.get('/filmes/'); 
        setFilmes(response.data);
      } catch (error) {
        console.error("Erro ao carregar filmes", error);
      } finally {
        setLoading(false);
      }
    }
    loadFilmes();
  }, []);

  if (loading) return <div className="text-white p-10">Carregando filmes...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">Meus Filmes</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition-colors">
            + Novo Filme
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filmes.length > 0 ? (
            filmes.map(filme => (
              <div key={filme.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all shadow-lg">
                <h2 className="text-xl font-bold text-white mb-2">{filme.titulo}</h2>
                <p className="text-gray-400">Gênero: <span className="text-gray-200">{filme.genero}</span></p>
                <p className="text-gray-400">Ano: <span className="text-gray-200">{filme.ano_lancamento}</span></p>
                <div className="mt-4 flex gap-2">
                  <button className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-600/40">Editar</button>
                  <button className="text-sm bg-red-600/20 text-red-400 px-3 py-1 rounded hover:bg-red-600/40">Excluir</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Nenhum filme cadastrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}