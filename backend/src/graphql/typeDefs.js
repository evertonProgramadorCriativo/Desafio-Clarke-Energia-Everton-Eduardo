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

  # Resultado de economia para um fornecedor
  type Economia {
    fornecedorId: ID!
    fornecedorNome: String!
    fornecedorLogo: String
    fornecedorAvaliacao: Float!
    fornecedorClientes: Int!
    tipoSolucao: TipoSolucao!
    custoKwhFornecedor: Float!
    custoBase: Float!
    custoFornecedor: Float!
    economiaValor: Float!
    economiaPercentual: Float!
    temEconomia: Boolean!
  }

  # Solução disponível com economias
  type SolucaoDisponivel {
    tipoSolucao: TipoSolucao!
    totalFornecedores: Int!
    melhorEconomia: Economia
    economias: [Economia!]!
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
    
    # QUERY PRINCIPAL - Calcular economia
    calcularEconomia(
      uf: String!
      consumoKwh: Float!
    ): [SolucaoDisponivel!]!
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