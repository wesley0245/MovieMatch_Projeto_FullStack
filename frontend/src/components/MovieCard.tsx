import { Filme } from '../types/index';

interface MovieCardProps {
  filme: Filme;
  onDelete: (id: string) => void;
}

export function MovieCard({ filme, onDelete }: MovieCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col shadow-lg h-full">
      <div className="h-40 bg-slate-800 flex items-center justify-center border-b border-slate-700">
        <span className="text-slate-600 font-bold italic opacity-30 text-xs uppercase">IMAGEM</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="text-sm font-black text-white truncate w-32">{filme.titulo}</h2>
        </div>
        
        <p className="text-slate-500 text-[10px] font-bold">{filme.ano_lancamento}</p>
        <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mb-4">GÊNERO: {filme.genero?.nome}</p>
        
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex-1 mb-4">
          <p className="text-slate-400 text-[10px] leading-relaxed italic">
            {filme.sinopse || "Nenhuma recomendação escrita."}
          </p>
        </div>

        <button 
          onClick={() => onDelete(filme.id)}
          className="text-[9px] font-bold text-slate-600 hover:text-red-500 uppercase self-end transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}