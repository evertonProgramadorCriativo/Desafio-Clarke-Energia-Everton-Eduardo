# Clarke Energia – Backend 

Backend da aplicação **Clarke Energia**, desenvolvido em **Node.js**, utilizando **Express**, **GraphQL (Apollo Server)** e **PostgreSQL**, com **Sequelize** como ORM.  
O projeto foi criado para dar suporte à SPA de escolha de fornecedor de energia, permitindo consultas e regras de negócio relacionadas a consumo, estado (UF) e tipos de soluções energéticas.

##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **GraphQL (Apollo Server)**
- **PostgreSQL**
- **Sequelize**
- **Docker & Docker Compose**
- **Jest & Supertest** (testes)
- **Nodemon** (ambiente de desenvolvimento)

##  Funcionalidades Iniciais

- Health Check da API (`/health`)
- Conexão e validação automática do banco de dados
- Estrutura preparada para GraphQL
- Migrations e seeds de banco de dados
- Ambiente containerizado com Docker

##  Como Executar o Projeto

### Usando Docker (recomendado)

```bash
docker-compose up --build
