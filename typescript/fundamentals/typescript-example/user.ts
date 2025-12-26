import type { Request, Response } from 'express';

// Interface: Define a estrutura esperada para um usuário no corpo da requisição (req.body)
interface User {
  name: string;
  email: string;
  idade?: number; // Propriedade opcional
}

const users = [
    { name: "Gustavo Rabelo", email: "gustavo.rabelo@example.com", idade: 30 },
    { name: "Maria Silva", email: "maria.silva@example.com", idade: 25 },
    { name: "João Souza", email: "joao.souza@example.com", idade: 28 }
]

export const getAllUsers = (req: Request, res: Response): void => {
    // Demonstra que o TS garante que 'users' é um array de objetos do tipo User
    // O retorno da função é do tipo void, pois não retornamos nada, apenas enviamos uma resposta
    res.status(200).json(users);
}

export const createUser = (req: Request, res: Response): void => {
    const newUser: User = req.body; // O TS assegura que req.body corresponde à interface User

    res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
}

export const findUserById = (req: Request, res: Response): void => {
    const userId: number = parseInt(req.params.id ?? '0'); // Garantindo que userId é do tipo number
    
    const user = users.find((u, index) => index === userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "Usuário não encontrado." });
    }
}
