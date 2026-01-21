export const typeDefs = `#graphql
  # Enum para tipos de solução
  enum TipoSolucao {
    GD
    MERCADO_LIVRE
  }

  # Estado
  type Estado {
    id: ID!
    uf: String!
    nome: String!
    tarifaBaseKwh: Float!
    createdAt: String!
    updatedAt: String!
  }

  # Solução de um fornecedor
  type Fornecedores {
    id: ID!
    tipoSolucao: TipoSolucao!
    custoKwh: Float!
    estadosAtendidos: [String!]!
  }

  # Fornecedor
  type Fornecedor {
    id: ID!
    nome: String!
    logoUrl: String
    estadoOrigem: String!
    numeroClientes: Int!
    avaliacaoMedia: Float!
    solucoes: [Fornecedores!]!
    createdAt: String!
    updatedAt: String!
  }

  # Queries disponíveis
  type Query {
    # Buscar todos os estados
    estados: [Estado!]!
    
    # Buscar estado por UF
    estado(uf: String!): Estado
    
    # Buscar todos os fornecedores
    fornecedores: [Fornecedor!]!
    
    # Buscar fornecedor por ID
    fornecedor(id: ID!): Fornecedor
    
    # Buscar fornecedores por estado
    fornecedoresPorEstado(uf: String!): [Fornecedor!]!
  }

  # Mutations (para testes)
  type Mutation {
    # Criar um novo estado
    criarEstado(
      uf: String!
      nome: String!
      tarifaBaseKwh: Float!
    ): Estado!
  }
`;