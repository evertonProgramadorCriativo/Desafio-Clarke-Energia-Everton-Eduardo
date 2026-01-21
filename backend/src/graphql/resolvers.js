import { Estado, Fornecedor, Fornecedores } from '../models/index.js';
import { Op } from 'sequelize';
import { CalculoEconomiaService } from '../services/calculoEconomia.js';

export const resolvers = {
  Query: {
    // Buscar todos os estados
    estados: async () => {
      try {
        return await Estado.findAll({
          order: [['nome', 'ASC']]
        });
      } catch (error) {
        throw new Error(`Erro ao buscar estados: ${error.message}`);
      }
    },

    // Buscar estado por UF
    estado: async (_, { uf }) => {
      try {
        const estado = await Estado.findOne({
          where: { uf: uf.toUpperCase() }
        });
        
        if (!estado) {
          throw new Error(`Estado ${uf} não encontrado`);
        }
        
        return estado;
      } catch (error) {
        throw new Error(`Erro ao buscar estado: ${error.message}`);
      }
    },

    // Buscar todos os fornecedores
    fornecedores: async () => {
      try {
        return await Fornecedor.findAll({
          include: [{
            model: Fornecedores,
            as: 'solucoes'
          }],
          order: [['nome', 'ASC']]
        });
      } catch (error) {
        throw new Error(`Erro ao buscar fornecedores: ${error.message}`);
      }
    },

    // Buscar fornecedor por ID
    fornecedor: async (_, { id }) => {
      try {
        const fornecedor = await Fornecedor.findByPk(id, {
          include: [{
            model: Fornecedores,
            as: 'solucoes'
          }]
        });
        
        if (!fornecedor) {
          throw new Error(`Fornecedor ${id} não encontrado`);
        }
        
        return fornecedor;
      } catch (error) {
        throw new Error(`Erro ao buscar fornecedor: ${error.message}`);
      }
    },

    // Buscar fornecedores por estado
    fornecedoresPorEstado: async (_, { uf }) => {
      try {
        const ufUpper = uf.toUpperCase();
        
        // Busca fornecedores que têm soluções atendendo o estado
        const fornecedores = await Fornecedor.findAll({
          include: [{
            model: Fornecedores,
            as: 'solucoes',
            where: {
              estadosAtendidos: {
                [Op.contains]: [ufUpper]
              }
            },
            required: true
          }],
          order: [['avaliacaoMedia', 'DESC']]
        });
        
        return fornecedores;
      } catch (error) {
        throw new Error(`Erro ao buscar fornecedores por estado: ${error.message}`);
      }
    },

    // QUERY PRINCIPAL - Calcular Economia
    calcularEconomia: async (_, { uf, consumoKwh }) => {
      try {
        const ufUpper = uf.toUpperCase();

        // Validar consumo
        if (consumoKwh <= 0) {
          throw new Error('O consumo deve ser maior que zero');
        }

        // Buscar estado e validar
        const estado = await Estado.findOne({
          where: { uf: ufUpper }
        });

        if (!estado) {
          throw new Error(`Estado ${uf} não encontrado`);
        }

        // Buscar fornecedores que atendem o estado
        const fornecedores = await Fornecedor.findAll({
          include: [{
            model: Fornecedores,
            as: 'solucoes',
            where: {
              estadosAtendidos: {
                [Op.contains]: [ufUpper]
              }
            },
            required: true
          }]
        });

        //  Verificar se há fornecedores
        if (fornecedores.length === 0) {
          return [];
        }

        // Calcular economias e agrupar por solução
        const solucoesMap = CalculoEconomiaService.agruparPorSolucao(
          fornecedores,
          ufUpper,
          consumoKwh,
          parseFloat(estado.tarifaBaseKwh)
        );

        // Formatar resultado
        const resultado = CalculoEconomiaService.formatarResultado(solucoesMap);

        return resultado;
      } catch (error) {
        throw new Error(`Erro ao calcular economia: ${error.message}`);
      }
    }
  },

  Mutation: {
    // Criar um novo estado 
    criarEstado: async (_, { uf, nome, tarifaBaseKwh }) => {
      try {
        const estado = await Estado.create({
          uf: uf.toUpperCase(),
          nome,
          tarifaBaseKwh
        });
        
        return estado;
      } catch (error) {
        throw new Error(`Erro ao criar estado: ${error.message}`);
      }
    }
  }
};