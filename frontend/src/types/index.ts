export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Genero {
  id: string;
  nome: string;
}

export interface Filme {
  id: string;
  titulo: string;
  ano_lancamento: number;
  genero: Genero; 
  sinopse?: string;
}