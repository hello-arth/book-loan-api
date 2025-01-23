# Book Loan API

Uma API desenvolvida em Node.js e Express para gerenciar o empréstimo de livros em uma biblioteca. A API permite o cadastro de livros, registro de empréstimos, devoluções e consulta do status dos empréstimos. A API utiliza autenticação e autorização para controlar o acesso a certos recursos.

## Funcionalidades

- **Cadastro de livros**: Apenas administradores podem adicionar ou excluir livros.
- **Registro de empréstimos**: Apenas usuários registrados podem pegar livros emprestados.
- **Devolução de livros**: Permite que o usuário marque um empréstimo como devolvido.
- **Consulta de status de empréstimos**: Permite que usuários registrados consultem o status dos empréstimos.
- **Autenticação de usuários**: Apenas usuários registrados podem realizar o empréstimo de livros.
- **Autorização de administradores**: Apenas administradores podem realizar certas ações, como cadastrar ou excluir livros.
- **Armazenamento de Token**: O token de autenticação é armazenado nos cookies, simplificando o processo de autenticação para o usuário.
- **Autenticação opcional**: A página principal da API oferece autenticação opcional para melhorar a experiência do usuário. Usuários não registrados podem acessar a tela inicial e a página de um livro específico, mas não podem pegar livros emprestados.

## Stack utilizada

- Node.js
- Express
- JWT (JSON Web Token) para autenticação e autorização
## Instalação e configuração
1\. Clone o repositório:
```bash
  git clone git@github.com:hello-arth/book-loan-api.git
```
2\. Acesse o diretório do projeto:
```bash
  cd book-loan-api
```
3\. Instale as dependências:
```bash
  npm install
```
4\. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e siga a estrutura do arquivo `.env.example` no diretório.

5\. Inicie o servidor:
```bash
npm start
```
A API estará disponível em `http://localhost:3000`.
## Endpoints
