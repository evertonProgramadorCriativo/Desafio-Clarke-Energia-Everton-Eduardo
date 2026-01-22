
## Clarke Energia - Everton Eduardo


Backend da aplicação **Clarke Energia**, desenvolvido para suportar uma SPA de escolha de fornecedor de energia elétrica. Permite que usuários consultem soluções energéticas (Geração Distribuída e Mercado Livre), comparem fornecedores e calculem economia estimada com base no consumo e localização.

* * *

 Sobre o Projeto
------------------

Este backend foi desenvolvido como parte do **Desafio Clarke Energia** e oferece uma API GraphQL completa para:

*   Consultar estados e suas tarifas base de energia
*   Listar fornecedores disponíveis por região
*   Comparar soluções energéticas (GD vs Mercado Livre)
*   Calcular economia estimada com base no consumo informado

### Regras de Negócio

*   **Seleção por Estado**: Usuários selecionam a UF para ver fornecedores disponíveis
*   **Consumo Mensal**: Sistema aceita valores de consumo em kWh (> 0)
*   **Múltiplas Soluções**: Fornecedores podem oferecer GD, Mercado Livre ou ambos
*   **Cálculo de Economia**:
    *   `custo_base = consumo_kwh × tarifa_base_estado`
    *   `custo_fornecedor = consumo_kwh × custo_kwh_solução`
    *   `economia = custo_base - custo_fornecedor`

* * *

 Tecnologias Utilizadas
--------------------------

*   **Runtime**: Node.js
*   **Framework**: Express
*   **API**: GraphQL (Apollo Server)
*   **Banco de Dados**: PostgreSQL
*   **ORM**: Sequelize
*   **Containerização**: Docker & Docker Compose
*   **Testes**: Jest & Supertest
*   **Desenvolvimento**: Nodemon

* * *

 Estrutura do Banco de Dados
-------------------------------

### Models (Sequelize)

| Model | Descrição |
| --- | --- |
| `Estado` | Estados brasileiros com tarifa base por kWh |
| `Fornecedor` | Fornecedores de energia com avaliação e informações |
| `Fornecedores` | Soluções oferecidas (GD/Mercado Livre) por fornecedor |

### Dados Seed

*   **5 Estados**: SP, RJ, MG, RS, PR com tarifas diferentes
*   **6 Fornecedores**: Empresas fictícias com logos e avaliações
*   **7 Soluções**: Combinações de fornecedores, tipos e estados atendidos

* * *

 Como Executar
----------------

### Opção 1: Docker (Recomendado)

bash

    # Inicie os containers
    
      docker-compose up --build

    # Execute as migrations (Criando Tabela no banco de dados):

      docker exec -it clarke_backend npm run db:migrate

    # Insira no banco de dados :

      docker exec -it clarke_backend npm run db:seed
      
    # Parar containers
    
      docker-compose down  

    
    # A API estará disponível em http://localhost:4000/graphql

### Opção 2: Local

bash

    # Instale as dependências
    npm install
    
    # Configure as variáveis de ambiente
    cp .env.example .env
    # Edite o .env com suas credenciais do PostgreSQL
    
    # Execute as migrations e seeds
    npm run db:migrate
    npm run db:seed
    
    # Inicie o servidor
    npm run dev

* * *

 API GraphQL
--------------

### Queries Disponíveis Apollo Server

#### 1\. Listar Todos os Estados

graphql

    query {
      estados {
        id
        uf
        nome
        tarifaBaseKwh
      }
    }

#### 2\. Buscar Estado por UF

graphql

    query {
      estado(uf: "SP") {
        id
        uf
        nome
        tarifaBaseKwh
      }
    }

#### 3\. Listar Fornecedores com Soluções

graphql

    query {
      fornecedores {
        id
        nome
        logoUrl
        estadoOrigem
        numeroClientes
        avaliacaoMedia
        solucoes {
          id
          tipoSolucao
          custoKwh
          estadosAtendidos
        }
      }
    }

#### 4\. Fornecedores por Estado

graphql

    query {
      fornecedoresPorEstado(uf: "SP") {
        id
        nome
        estadoOrigem
        avaliacaoMedia
        solucoes {
          tipoSolucao
          custoKwh
        }
      }
    }

#### 5\. Buscar Fornecedor por ID

graphql

    query {
      fornecedor(id: 1) {
        id
        nome
        logoUrl
        numeroClientes
        avaliacaoMedia
        solucoes {
          tipoSolucao
          custoKwh
          estadosAtendidos
        }
      }
    }

#### 6\. Economia em São Paulo (30.000 kWh)
### Cenário: Usuário em SP com consumo de 30.000 kWh

graphql

    query {
    calcularEconomia(uf: "SP", consumoKwh: 30000) {
        tipoSolucao
        totalFornecedores
        melhorEconomia {
        fornecedorNome
        economiaValor
        economiaPercentual
        custoBase
        custoFornecedor
        }
        economias {
        fornecedorNome
        fornecedorAvaliacao
        economiaValor
        economiaPercentual
        temEconomia
        }
    }
    }
#### 7\. Economia em Rio de Janeiro (50.000 kWh)
### Cenário: Usuário em RJ com consumo de 50.000 kWh

graphql

    query {
    calcularEconomia(uf: "RJ", consumoKwh: 50000) {
        tipoSolucao
        totalFornecedores
        melhorEconomia {
        fornecedorNome
        economiaValor
        economiaPercentual
        }
    }
    }

### Mutations Disponíveis

#### Criar Novo Estado

graphql

    mutation {
      criarEstado(
        uf: "SC"
        nome: "Santa Catarina"
        tarifaBaseKwh: 0.625
      ) {
        id
        uf
        nome
        tarifaBaseKwh
      }
    }


* * *

 Testando a API
-----------------

### Apollo Sandbox (Navegador)

Acesse [http://localhost:4000/graphql](http://localhost:4000/graphql) e execute:

graphql

    query TodosOsDados {
      estados {
        uf
        nome
        tarifaBaseKwh
      }
      
      fornecedores {
        nome
        avaliacaoMedia
        solucoes {
          tipoSolucao
          custoKwh
          estadosAtendidos
        }
      }
    }

### Postman

**Configuração:**

*   Method: `POST`
*   URL: `http://localhost:4000/graphql`
*   Headers: `Content-Type: application/json`

**Body (raw JSON):**

json

    {
      "query": "query { estados { id uf nome tarifaBaseKwh } }"
    }

### Health Check

bash

    curl http://localhost:4000/health

* * *

 Scripts Disponíveis
----------------------

bash

    npm run dev          # Inicia servidor em modo desenvolvimento
    npm start            # Inicia servidor em produção
    npm run db:migrate   # Executa migrations (cria tabelas)
    npm run db:seed      # Popula banco com dados iniciais
    npm run db:reset     # Reseta banco completamente (migrate + seed)
    npm test             # Executa testes automatizados
    ```

    

* * *

Variáveis de Ambiente
------------------------

Crie um arquivo `.env` na raiz do projeto:

env

    NODE_ENV=development
    PORT=4000
    
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=clarke_energia
    DB_USER=postgres
    DB_PASSWORD=sua_senha


📊 Dados Inseridos no Banco
---------------------------

### **Estados (5 registros)**

| UF | Nome | Tarifa Base kWh |
| --- | --- | --- |
| SP | São Paulo | R$ 0,656 |
| RJ | Rio de Janeiro | R$ 0,789 |
| MG | Minas Gerais | R$ 0,612 |
| ES | Espírito Santo | R$ 0,701 |
| PR | Paraná | R$ 0,598 |

### **Fornecedores (6 registros)**

| Nome | Estado Origem | Nº Clientes | Avaliação |
| --- | --- | --- | --- |
| EcoEnergy Solar | SP | 1500 | 4.7 |
| PowerFree Mercado | RJ | 3200 | 4.5 |
| SolarTech Brasil | MG | 2100 | 4.8 |
| Energia Livre SP | SP | 4500 | 4.6 |
| GreenPower RJ | RJ | 1800 | 4.4 |
| MegaWatt Soluções | PR | 2700 | 4.9 |

### **Soluções dos Fornecedores (7 registros)**

| Fornecedor | Tipo Solução | Custo kWh | Estados Atendidos |
| --- | --- | --- | --- |
| EcoEnergy Solar | GD | R$ 0,450 | SP, RJ, MG |
| PowerFree Mercado | MERCADO\_LIVRE | R$ 0,520 | RJ, SP, ES |
| SolarTech Brasil | GD | R$ 0,430 | MG, SP, RJ, ES |
| Energia Livre SP | MERCADO\_LIVRE | R$ 0,510 | SP, MG, PR |
| GreenPower RJ | GD | R$ 0,470 | RJ, ES |
| GreenPower RJ | MERCADO\_LIVRE | R$ 0,540 | RJ, SP |
| MegaWatt Soluções | MERCADO\_LIVRE | R$ 0,495 | PR, SP, MG |

* * *

**Desenvolvido Por Everton Eduardo para o Desafio Clarke Energia**

---

