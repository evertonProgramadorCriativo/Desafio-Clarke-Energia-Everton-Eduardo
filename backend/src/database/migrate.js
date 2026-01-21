import sequelize from '../config/database.js';

/**
 * Script de Schema Migration
 * Cria todas as tabelas usando SQL puro na ordem correta
 */

const runMigrations = async () => {
  try {

    await sequelize.query('DROP TABLE IF EXISTS "fornecedor" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "fornecedores" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "estados" CASCADE;');
    await sequelize.query('DROP TYPE IF EXISTS "enum_fornecedor_tipo_solucao" CASCADE;');

    console.log('\n Criando tipo ENUM...');
    await sequelize.query(`
      CREATE TYPE "enum_fornecedor_tipo_solucao" AS ENUM ('GD', 'MERCADO_LIVRE');
    `);

    console.log('\nCriando tabelas...');

    // Estados
    await sequelize.query(`
      CREATE TABLE "estados" (
        "id" SERIAL PRIMARY KEY,
        "uf" VARCHAR(2) NOT NULL UNIQUE,
        "nome" VARCHAR(100) NOT NULL,
        "tarifa_base_kwh" DECIMAL(10,4) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('  estados');

    // Fornecedores
    await sequelize.query(`
      CREATE TABLE "fornecedores" (
        "id" SERIAL PRIMARY KEY,
        "nome" VARCHAR(200) NOT NULL,
        "logo_url" VARCHAR(500),
        "estado_origem" VARCHAR(2) NOT NULL,
        "numero_clientes" INTEGER NOT NULL DEFAULT 0,
        "avaliacao_media" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('fornecedores');

    // Fornecedor Soluções
    await sequelize.query(`
      CREATE TABLE "fornecedor" (
        "id" SERIAL PRIMARY KEY,
        "fornecedor_id" INTEGER NOT NULL,
        "tipo_solucao" "enum_fornecedor_tipo_solucao" NOT NULL,
        "custo_kwh" DECIMAL(10,4) NOT NULL,
        "estados_atendidos" VARCHAR(2)[] NOT NULL DEFAULT ARRAY[]::VARCHAR(2)[],
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT "fornecedor_fornecedor_id_fkey" 
          FOREIGN KEY ("fornecedor_id") 
          REFERENCES "fornecedores" ("id") 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,
        CONSTRAINT "fornecedor_fornecedor_id_tipo_solucao_unique" 
          UNIQUE ("fornecedor_id", "tipo_solucao")
      );
    `);


    console.log('\n Migrations executadas com sucesso!');


    process.exit(0);
  } catch (error) {
    console.error(' Erro ao executar migrations:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

runMigrations();