/**
 * Serviço de Cálculo de Economia
 * 
 * Fórmulas:
 * - custo_base = consumo_kwh * tarifa_base_kwh(estado)
 * - custo_fornecedor = consumo_kwh * custo_kwh_fornecedor(solucao)
 * - economia = custo_base - custo_fornecedor
 * - economia_percentual = (economia / custo_base) * 100
 */

export class CalculoEconomiaService {
  /**
   * Calcula economia para um fornecedor específico
   */
  static calcularEconomiaFornecedor(consumoKwh, tarifaBaseKwh, custoKwhFornecedor, fornecedor, solucao) {
    // Validações
    if (consumoKwh <= 0) {
      throw new Error('Consumo deve ser maior que zero');
    }
    if (tarifaBaseKwh <= 0 || custoKwhFornecedor <= 0) {
      throw new Error('Tarifas devem ser maiores que zero');
    }

    // Cálculos
    const custoBase = parseFloat((consumoKwh * tarifaBaseKwh).toFixed(2));
    const custoFornecedor = parseFloat((consumoKwh * custoKwhFornecedor).toFixed(2));
    const economiaValor = parseFloat((custoBase - custoFornecedor).toFixed(2));
    const economiaPercentual = parseFloat(((economiaValor / custoBase) * 100).toFixed(2));

    return {
      fornecedorId: fornecedor.id,
      fornecedorNome: fornecedor.nome,
      fornecedorLogo: fornecedor.logoUrl,
      fornecedorAvaliacao: parseFloat(fornecedor.avaliacaoMedia),
      fornecedorClientes: fornecedor.numeroClientes,
      tipoSolucao: solucao.tipoSolucao,
      custoKwhFornecedor: parseFloat(custoKwhFornecedor),
      custoBase,
      custoFornecedor,
      economiaValor,
      economiaPercentual,
      // Flag para indicar se há economia
      temEconomia: economiaValor > 0
    };
  }

  /**
   * Agrupa fornecedores por tipo de solução
   */
  static agruparPorSolucao(fornecedores, uf, consumoKwh, tarifaBaseKwh) {
    const solucoesMap = new Map();

    fornecedores.forEach(fornecedor => {
      fornecedor.solucoes.forEach(solucao => {
        // Verifica se a solução atende o estado
        if (!solucao.estadosAtendidos.includes(uf)) {
          return;
        }

        const tipoSolucao = solucao.tipoSolucao;
        const economia = this.calcularEconomiaFornecedor(
          consumoKwh,
          tarifaBaseKwh,
          parseFloat(solucao.custoKwh),
          fornecedor,
          solucao
        );

        // Inicializa o array se não existir
        if (!solucoesMap.has(tipoSolucao)) {
          solucoesMap.set(tipoSolucao, []);
        }

        solucoesMap.get(tipoSolucao).push(economia);
      });
    });

    return solucoesMap;
  }

  /**
   * Encontra a melhor economia de um array
   */
  static encontrarMelhorEconomia(economias) {
    if (!economias || economias.length === 0) {
      return null;
    }

    return economias.reduce((melhor, atual) => {
      return atual.economiaValor > melhor.economiaValor ? atual : melhor;
    });
  }

  /**
   * Ordena economias (melhor primeiro)
   */
  static ordenarEconomias(economias) {
    return [...economias].sort((a, b) => {
      // Primeiro por economia (maior primeiro)
      if (b.economiaValor !== a.economiaValor) {
        return b.economiaValor - a.economiaValor;
      }
      // Depois por avaliação (maior primeiro)
      if (b.fornecedorAvaliacao !== a.fornecedorAvaliacao) {
        return b.fornecedorAvaliacao - a.fornecedorAvaliacao;
      }
      // Por fim por número de clientes (maior primeiro)
      return b.fornecedorClientes - a.fornecedorClientes;
    });
  }

  /**
   * Formata resultado final por solução
   */
  static formatarResultado(solucoesMap) {
    const resultado = [];

    solucoesMap.forEach((economias, tipoSolucao) => {
      const economiasOrdenadas = this.ordenarEconomias(economias);
      const melhorEconomia = this.encontrarMelhorEconomia(economias);

      resultado.push({
        tipoSolucao,
        totalFornecedores: economias.length,
        melhorEconomia,
        economias: economiasOrdenadas
      });
    });

    // Ordena as soluções pela melhor economia
    return resultado.sort((a, b) => {
      const economiaA = a.melhorEconomia?.economiaValor || 0;
      const economiaB = b.melhorEconomia?.economiaValor || 0;
      return economiaB - economiaA;
    });
  }
}