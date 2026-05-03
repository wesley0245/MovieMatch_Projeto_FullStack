// frontend/src/types/index.ts

export interface Genero {
  id: string; // UUID é uma string no TypeScript
  nome: string;
  ativo: boolean;
}

export interface Filme {
  id: string;
  titulo: string;
  ano_lancamento: number;
  sinopse?: string; // O '?' porque no seu model está null=True
  genero: string;   // Aqui geralmente recebemos o ID ou o objeto do gênero
  ativo: boolean;
}

export interface Avaliacao {
  id: string;
  filme: string;
  usuario: string;
  comentario: string;
  nota: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
}