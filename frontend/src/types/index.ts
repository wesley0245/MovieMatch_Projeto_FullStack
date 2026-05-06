export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Filme {
  id: string;
  titulo: string; //
  ano_lancamento: number; //
  sinopse?: string; //
  genero: number | any; //
}