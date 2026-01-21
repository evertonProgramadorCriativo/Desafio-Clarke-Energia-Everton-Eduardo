import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { testConnection } from './config/database.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Clarke Energia API está funcionando!',
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

    // Cria instância do Apollo Server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (error) => {
        console.error('GraphQL Error:', error);
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR'
        };
      }
    });

    // Inicia o Apollo Server
    await apolloServer.start();
    console.log('Apollo Server iniciado!');

    // Adiciona middleware do GraphQL
    app.use(
      '/graphql',
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({ req })
      })
    );

    // Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();