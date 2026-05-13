import { useEffect, useState } from 'react';
import api from '../services/api';
import { Filme } from '../types/index'; // Lembra de adicionar a interface Filme no seu types/index.ts
import { MovieCard } from '../components/MovieCard';


export function Dashboard() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [novoFilme, setNovoFilme] = useState({
    titulo: '',
    ano_lancamento: '',
    genero_id: '', 
    sinopse: ''
  });

  async function handleAddFilme(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/v1/filmes/', novoFilme);
      setFilmes([response.data, ...filmes]);

      setNovoFilme({ titulo: '', ano_lancamento: '', genero_id: '', sinopse: '' });

      alert("Filme adicionado!");
    } catch (error) {
      alert("Erro ao salvar!");
    }
  }
  
  // Excluir
  async function handleDelete(id: string) {
    if (window.confirm("Deseja realmente excluir este filme?")) {
      try {
        await api.delete(`/v1/filmes/${id}/`);
        // Remove o filme da tela sem precisar dar F5
        setFilmes(filmes.filter(f => f.id !== id));
      } catch (error) {
        alert("Erro ao excluir!");
      }
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
  <div className="flex min-h-screen bg-slate-950 text-white" style={{ display: 'flex' }}>
    
    {/* SIDEBAR - Largura Fixa de 320px */}
    <aside 
      className="bg-slate-900 p-6 border-r border-slate-800 h-screen sticky top-0"
      style={{ width: '320px', minWidth: '320px', flexShrink: 0 }}
    >
      <h2 className="text-xl font-bold mb-1 text-blue-400">Adicione o seu filme</h2>
      <p className="text-slate-500 text-[10px] mb-6">e deixe sua recomendação</p>

      <form onSubmit={handleAddFilme} className="flex flex-col gap-3">
        <input 
          placeholder="Título" 
          className="bg-slate-800 p-2 rounded text-xs border border-slate-700 outline-none focus:border-blue-500"
          value={novoFilme.titulo}
          onChange={(e) => setNovoFilme({...novoFilme, titulo: e.target.value})}
        />
        <input 
          placeholder="Ano" 
          className="bg-slate-800 p-2 rounded text-xs border border-slate-700"
          value={novoFilme.ano_lancamento}
          onChange={(e) => setNovoFilme({...novoFilme, ano_lancamento: e.target.value})}
        />
        <input 
          placeholder="Gênero ID" 
          className="bg-slate-800 p-2 rounded text-xs border border-slate-700"
          value={novoFilme.genero_id}
          onChange={(e) => setNovoFilme({...novoFilme, genero_id: e.target.value})}
        />
        <textarea 
          placeholder="Recomendação" 
          className="bg-slate-800 p-2 rounded text-xs border border-slate-700 h-32 resize-none"
          value={novoFilme.sinopse}
          onChange={(e) => setNovoFilme({...novoFilme, sinopse: e.target.value})}
        />
        <button className="bg-white text-slate-900 font-bold py-2 rounded mt-2 text-[10px] uppercase hover:bg-blue-400 transition-colors">
          Enviar
        </button>
      </form>
    </aside>

    {/* CONTEÚDO PRINCIPAL */}
    <main className="flex-1 p-10 overflow-y-auto">
      <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">MOVIEMATCH</h1>
        <button onClick={handleLogout} className="text-[10px] font-bold uppercase text-slate-500 hover:text-white">Sair</button>
      </header>

      <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-slate-400">Filmes</h3>

      {/* GRID DE FILMES - Forçando 3 colunas no Desktop */}
      <div 
        className="grid gap-6" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}
      >
        {filmes.map((filme) => (
          <MovieCard key={filme.id} filme={filme} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  </div>
);
}