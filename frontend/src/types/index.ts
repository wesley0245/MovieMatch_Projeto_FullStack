export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Filme {
  id: string;
  titulo: string;
  ano_lancamento: number;
  genero: any; // Usamos any aqui para aceitar o ID ou o nome que vem do Django
  sinopse?: string;
}