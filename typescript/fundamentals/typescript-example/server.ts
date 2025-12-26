import express, {type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';

import { getAllUsers, createUser, findUserById } from './user.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', (req, res) => {
  res.json({
    message: "Bem vindo ao servidor Express com TypeScript!",
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/users', getAllUsers);

app.get('/api/users/:id', findUserById);

app.post('/api/users', createUser);


// Middleware de tratamento de erros
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
    path: req.originalUrl,
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado no servidor.',
  });
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📲 Acesse: http://localhost:${PORT}`)
  console.log(`🔍 Health check: http://localhost:${PORT}/health`)
})

export default app;
