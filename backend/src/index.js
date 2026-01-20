import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor Clarke Energia API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Inicializa o servidor
const startServer = async () => {
  try {
    // Testa conexão com banco
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('Falha ao conectar com banco de dados. Encerrando...');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(` Servidor rodando em http://localhost:${PORT}`);
      console.log(`Verificação de saúde: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error(' Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();