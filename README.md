# MovieMatch 🎬 - Sistema de Recomendação de Filmes

O **MovieMatch** é uma aplicação Full-Stack desenvolvida para o gerenciamento de catálogos de filmes. O sistema permite que usuários cadastrem suas obras favoritas, atribuam gêneros e deixem recomendações personalizadas.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React.js** + **TypeScript**: Construção de interface reativa e tipagem estática.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Axios**: Comunicação eficiente com a API.
- **Vite**: Ferramenta de build rápida.

### Backend
- **Python** + **Django**: Framework principal.
- **Django REST Framework (DRF)**: Criação de endpoints robustos.
- **PostgreSQL**: Banco de dados relacional para persistência de dados.

---

## 🛠️ Instruções de Instalação e Execução

### 1. Requisitos Prévios
- Node.js instalado.
- Python 3.x instalado.
- PostgreSQL configurado.


### 2. Configurando o Backend (Django)

## Navegue até a pasta do servidor:

cd backend

Crie um ambiente virtual (venv):

python -m venv venv
# Ative o ambiente virtual:

# No Windows:

.\venv\Scripts\activate
# No Linux/macOS:

source venv/bin/activate

# Instale as dependências necessárias:

pip install -r requirements.txt
# Execute as migrações para preparar o banco de dados:

python manage.py migrate
# Inicie o servidor de desenvolvimento:

python manage.py runserver
## Navegue até a pasta do cliente:

cd frontend
# Instale as dependências:

npm install
# Inicie a aplicação em modo de desenvolvimento:

npm run dev

Acesse em seu navegador: http://localhost:5173

