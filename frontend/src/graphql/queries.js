import { gql } from '@apollo/client';

export const GET_ESTADOS = gql`
  query GetEstados {
    estados {
      id
      uf
      nome
      tarifaBaseKwh
    }
  }
`;

export const CALCULAR_ECONOMIA = gql`
  query CalcularEconomia($uf: String!, $consumoKwh: Float!) {
    calcularEconomia(uf: $uf, consumoKwh: $consumoKwh) {
      tipoSolucao
      totalFornecedores
      melhorEconomia {
        fornecedorId
        fornecedorNome
        fornecedorLogo
        fornecedorAvaliacao
        fornecedorClientes
        economiaValor
        economiaPercentual
        custoBase
        custoFornecedor
      }
      economias {
        fornecedorId
        fornecedorNome
        fornecedorLogo
        fornecedorAvaliacao
        fornecedorClientes
        tipoSolucao
        custoKwhFornecedor
        custoBase
        custoFornecedor
        economiaValor
        economiaPercentual
        temEconomia
      }
    }
  }
`;