import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Testa a conexão
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexão com banco de dados estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error(' Erro ao conectar com banco de dados:', error);
    return false;
  }
};

export default sequelize;