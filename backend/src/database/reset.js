import sequelize from '../config/database.js';
import { Estado, Fornecedor, Fornecedores } from '../models/index.js';

/**
 * Script de Reset Completo do Banco de Dados
 * Uso: npm run db:reset
 */

const resetDatabase = async () => {
  try {
    //  Testar conexão
    console.log(' Testando conexão com banco');
    await sequelize.authenticate();
    console.log('Conexão estabelecida');

    // Dropar todas as tabelas
    console.log('Removendo tabelas antigas.');
    await sequelize.query('DROP TABLE IF EXISTS "fornecedor" CASCADE;');

    await sequelize.query('DROP TABLE IF EXISTS "fornecedores" CASCADE;');

    await sequelize.query('DROP TABLE IF EXISTS "estados" CASCADE;');


    // Criar ENUM type se não existir

    await sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_fornecedor_tipo_solucao" AS ENUM ('GD', 'MERCADO_LIVRE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log(' ENUM tipo_solucao criado');

    // Criar tabelas na ordem 

    await Estado.sync({ force: false });
    console.log('estados');

    await Fornecedor.sync({ force: false });
    console.log('fornecedores');

    await Fornecedores.sync({ force: false });
    console.log('fornecedor');

    // Verificar tabelas criadas
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);


    results.forEach(row => {
      console.log(`${row.table_name}`);
    });


    console.log('Reset completo realizado com sucesso!');

    process.exit(0);
  } catch (error) {

    console.error('Erro ao resetar o banco de dados:');
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

resetDatabase();