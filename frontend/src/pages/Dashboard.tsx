import { useEffect, useState } from 'react';
import api from '../services/api';
import { Filme } from '../types/index'; // Lembra de adicionar a interface Filme no seu types/index.ts

export function Dashboard() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [novoFilme, setNovoFilme] = useState({
    titulo: '',
    ano_lancamento: '',
    genero: '', 
    sinopse: ''
  });

  async function handleAddFilme(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/v1/filmes/', novoFilme);
      setFilmes([response.data, ...filmes]);
      alert("Filme adicionado!");
    } catch (error) {
      alert("Erro ao salvar!");
    }
  }
  
  // Logout
  function handleLogout() {
  // 1. Remove o token e os dados do usuário do navegador
  localStorage.removeItem('admin:token');
  localStorage.removeItem('admin:user');
  
  // 2. Recarrega a página (isso vai disparar o redirecionamento para o Login)
  window.location.href = '/'; 
}

  useEffect(() => {
    async function loadFilmes() {
      try {
        // Certifique-se de que a rota no Django é /filmes/
        const response = await api.get('/v1/filmes/'); 
        // Aqui a gente abre a "caixinha" results se ela existir
        const dados = response.data.results || response.data;
        setFilmes(dados);
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
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-6xl mx-auto">

        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">Meus Filmes</h1>
          <div className="flex gap-4"> {/* Container para os botões */}
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition-colors"
            >
              Sair
            </button>
            {/* O seu botão de + Novo Filme já está aqui... */}
          </div>
        </header>
        
        {/* FORMULÁRIO DE CADASTRO */}
        <section className="bg-gray-800 p-6 rounded-lg mb-10 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Cadastrar Novo Filme</h2>
          <form onSubmit={handleAddFilme} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Título do Filme" 
              className="bg-gray-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={novoFilme.titulo}
              onChange={e => setNovoFilme({...novoFilme, titulo: e.target.value})}
              required
            />
            <input 
              type="number" placeholder="Ano de Lançamento" 
              className="bg-gray-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={novoFilme.ano_lancamento}
              onChange={e => setNovoFilme({...novoFilme, ano_lancamento: e.target.value})}
              required
            />
            <input 
              type="text" placeholder="ID do Gênero (cole aquele código longo)" 
              className="bg-gray-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={novoFilme.genero}
              onChange={e => setNovoFilme({...novoFilme, genero: e.target.value})}
              required
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 font-bold py-2 rounded transition-colors">
              Salvar Filme
            </button>
          </form>
        </section>

        <hr className="border-gray-700 mb-10" />

        <h1 className="text-4xl font-bold mb-10 text-center">Meus Filmes</h1>

        {/* LISTAGEM DE FILMES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filmes.length > 0 ? (
            filmes.map((filme) => (
              <div key={filme.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all shadow-lg text-center">
                <h2 className="text-xl font-bold mb-2">{filme.titulo}</h2>
                <p className="text-gray-400 text-sm mb-1">Gênero (ID): {filme.genero}</p>
                <p className="text-gray-400">Ano: {filme.ano_lancamento}</p>
                <div className="mt-4 flex gap-2 justify-center">
                  <button className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-600/40">Editar</button>
                  <button className="text-sm bg-red-600/20 text-red-400 px-3 py-1 rounded hover:bg-red-600/40">Excluir</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic col-span-3 text-center">Nenhum filme cadastrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}