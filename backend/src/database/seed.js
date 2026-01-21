import { Estado, Fornecedor, Fornecedores } from '../models/index.js';

const runSeeds = async () => {
  try {
    console.log('Inserindo dados no banco de dados\n');

    // Criar Estados
    console.log(' Criando estados...');
    const estados = await Estado.bulkCreate([
      { uf: 'SP', nome: 'São Paulo', tarifaBaseKwh: 0.656 },
      { uf: 'RJ', nome: 'Rio de Janeiro', tarifaBaseKwh: 0.789 },
      { uf: 'MG', nome: 'Minas Gerais', tarifaBaseKwh: 0.612 },
      { uf: 'ES', nome: 'Espírito Santo', tarifaBaseKwh: 0.701 },
      { uf: 'PR', nome: 'Paraná', tarifaBaseKwh: 0.598 }
    ]);
    console.log(` ${estados.length} estados criados\n`);

    // Criar Fornecedores
    console.log(' Criando fornecedores...');
    const fornecedores = await Fornecedor.bulkCreate([
      {
        nome: 'EcoEnergy Solar',
        logoUrl: 'https://ui-avatars.com/api/?name=EcoEnergy+Solar&background=22c55e&color=fff',
        estadoOrigem: 'SP',
        numeroClientes: 1500,
        avaliacaoMedia: 4.7
      },
      {
        nome: 'PowerFree Mercado',
        logoUrl: 'https://ui-avatars.com/api/?name=PowerFree+Mercado&background=3b82f6&color=fff',
        estadoOrigem: 'RJ',
        numeroClientes: 3200,
        avaliacaoMedia: 4.5
      },
      {
        nome: 'SolarTech Brasil',
        logoUrl: 'https://ui-avatars.com/api/?name=SolarTech+Brasil&background=eab308&color=fff',
        estadoOrigem: 'MG',
        numeroClientes: 2100,
        avaliacaoMedia: 4.8
      },
      {
        nome: 'Energia Livre SP',
        logoUrl: 'https://ui-avatars.com/api/?name=Energia+Livre+SP&background=8b5cf6&color=fff',
        estadoOrigem: 'SP',
        numeroClientes: 4500,
        avaliacaoMedia: 4.6
      },
      {
        nome: 'GreenPower RJ',
        logoUrl: 'https://ui-avatars.com/api/?name=GreenPower+RJ&background=10b981&color=fff',
        estadoOrigem: 'RJ',
        numeroClientes: 1800,
        avaliacaoMedia: 4.4
      },
      {
        nome: 'MegaWatt Soluções',
        logoUrl: 'https://ui-avatars.com/api/?name=MegaWatt+Solucoes&background=f59e0b&color=fff',
        estadoOrigem: 'PR',
        numeroClientes: 2700,
        avaliacaoMedia: 4.9
      }
    ]);
    console.log(` ${fornecedores.length} fornecedores criados\n`);

    //  Criar Soluções dos Fornecedores
    console.log('Criando soluções dos fornecedores...');
    const solucoes = await Fornecedores.bulkCreate([
      // EcoEnergy Solar - GD
      {
        fornecedorId: fornecedores[0].id,
        tipoSolucao: 'GD',
        custoKwh: 0.450,
        estadosAtendidos: ['SP', 'RJ', 'MG']
      },
      // PowerFree Mercado - Mercado Livre
      {
        fornecedorId: fornecedores[1].id,
        tipoSolucao: 'MERCADO_LIVRE',
        custoKwh: 0.520,
        estadosAtendidos: ['RJ', 'SP', 'ES']
      },
      // SolarTech Brasil - GD
      {
        fornecedorId: fornecedores[2].id,
        tipoSolucao: 'GD',
        custoKwh: 0.430,
        estadosAtendidos: ['MG', 'SP', 'RJ', 'ES']
      },
      // Energia Livre SP - Mercado Livre
      {
        fornecedorId: fornecedores[3].id,
        tipoSolucao: 'MERCADO_LIVRE',
        custoKwh: 0.510,
        estadosAtendidos: ['SP', 'MG', 'PR']
      },
      // GreenPower RJ - GD
      {
        fornecedorId: fornecedores[4].id,
        tipoSolucao: 'GD',
        custoKwh: 0.470,
        estadosAtendidos: ['RJ', 'ES']
      },
      // GreenPower RJ - Mercado Livre
      {
        fornecedorId: fornecedores[4].id,
        tipoSolucao: 'MERCADO_LIVRE',
        custoKwh: 0.540,
        estadosAtendidos: ['RJ', 'SP']
      },
      // MegaWatt Soluções - Mercado Livre
      {
        fornecedorId: fornecedores[5].id,
        tipoSolucao: 'MERCADO_LIVRE',
        custoKwh: 0.495,
        estadosAtendidos: ['PR', 'SP', 'MG']
      }
    ]);
    console.log(` ${solucoes.length} soluções criadas\n`);


    console.log(' Seeds executados com sucesso!');


    console.log(` ${estados.length} estados`);
    console.log(` ${fornecedores.length} fornecedores`);
    console.log(` ${solucoes.length} soluções`);

    console.log('http://localhost:4000/graphql\n');

    process.exit(0);
  } catch (error) {
    console.error('\n Erro ao executar seeds:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

runSeeds();