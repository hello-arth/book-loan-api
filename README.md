# Book Loan API

Uma API desenvolvida em Node.js e Express para gerenciar o empréstimo de livros em uma biblioteca. A API permite realizar o cadastro de livros, registro de empréstimos, devoluções e consulta do status dos empréstimos. A API utiliza autenticação e autorização para controlar o acesso a certos recursos.

## Funcionalidades

- **Autenticação opcional**: A página principal da API oferece autenticação opcional para melhorar a experiência do usuário. Usuários não registrados podem acessar a tela inicial e a página de um livro específico, mas não podem pegar livros emprestados.
- **Autenticação de usuários**: Apenas usuários registrados podem realizar o empréstimo de livros.
- **Armazenamento de Token**: O token de autenticação é armazenado nos cookies, simplificando o processo de autenticação para o usuário.
- **Cadastro de livros**: Apenas administradores podem adicionar ou excluir livros.
- **Registro de empréstimos**: Apenas usuários registrados podem pegar livros emprestados.
- **Devolução de livros**: Permite que o usuário devolva um livro e marque o empréstimo como devolvido.
- **Consulta de status de empréstimos**: Permite que usuários registrados consultem o status dos empréstimos.
- **Autorização de administradores**: Apenas administradores têm permissão para realizar ações críticas, como visualizar a lista de usuários cadastrados, adicionar novos livros ao sistema e excluir livros existentes.

## Stack utilizada

- Node.js
- JavaScript
- Express
- JWT (JSON Web Token) para autenticação e autorização
- bcrypt
  
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

# Endpoints

## Auth Routes (`/auth`)

- **GET** `/auth/`  
  **Autenticação Requerida**: Sim (somente admin)  
  **Descrição**: Retorna uma lista de todos os usuários do sistema. Este endpoint exige que o usuário esteja autenticado e seja um administrador.

- **POST** `/auth/register`  
  **Autenticação Requerida**: Não  
  **Descrição**: Registra um novo usuário. Envia os dados do usuário (como nome, e-mail, senha) no corpo da requisição. Se algum dado estiver inválido, retorna um erro 400.

- **POST** `/auth/login`  
  **Autenticação Requerida**: Não  
  **Descrição**: Realiza o login de um usuário, verificando as credenciais (e-mail e senha). Em caso de sucesso, retorna um token JWT no cookie de resposta, que é utilizado para autenticação em futuras requisições. Em caso de falha nas credenciais, retorna um erro 401.

## API Routes (`/api`)

### Books Routes (`/api/books`)

- **GET** `/api/books`  
  **Autenticação Requerida**: Opcional  
  **Descrição**: Retorna uma lista de todos os livros. Caso o usuário esteja autenticado, a mensagem de boas-vindas incluirá o nome do usuário.

- **GET** `/api/books/:bookId`  
  **Autenticação Requerida**: Opcional  
  **Descrição**: Retorna detalhes de um livro específico, identificado pelo `bookId`.

- **POST** `/api/books`  
  **Autenticação Requerida**: Sim (somente admin)  
  **Descrição**: Cria um novo livro no sistema. Os dados do livro devem ser enviados no corpo da requisição. Requer que o usuário seja autenticado e tenha permissão de administrador.

- **DELETE** `/api/books/:bookId`  
  **Autenticação Requerida**: Sim (somente admin)  
  **Descrição**: Deleta um livro do sistema, identificado pelo `bookId`. Requer que o usuário seja autenticado e tenha permissão de administrador.

### Loans Routes (`/api/loans`)

- **GET** `/api/loans`  
  **Autenticação Requerida**: Sim (somente admin)  
  **Descrição**: Retorna uma lista de todos os empréstimos.

- **GET** `/api/loans/:loanId`  
  **Autenticação Requerida**: Sim  
  **Descrição**: Retorna detalhes de um empréstimo específico, identificado pelo `loanId`. Requer que o usuário esteja autenticado.

- **POST** `/api/loans/:bookId`  
  **Autenticação Requerida**: Sim  
  **Descrição**: Realiza um empréstimo de um livro específico, identificado pelo `bookId`. Requer que o usuário esteja autenticado. Cria um empréstimo associado ao `userId` do usuário autenticado.

- **PUT** `/api/loans/:loanId/return`  
  **Autenticação Requerida**: Sim  
  **Descrição**: Marca um empréstimo como devolvido, identificado pelo `loanId`. Requer que o usuário esteja autenticado.

---

## Observações sobre Autenticação

- **`optionalAuth`**: Middleware que permite o acesso aos endpoints sem autenticação, mas, se o token de autenticação for válido, as informações do usuário autenticado são anexadas à requisição.
  
- **`ensureAuth`**: Middleware que exige que o usuário esteja autenticado. Se o token de autenticação não for válido ou não estiver presente, retorna um erro 401.

- **`ensureAdmin`**: Middleware que exige que o usuário seja um administrador. Se o usuário não for um administrador, retorna um erro 401.

## Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
