// =========================
// TIPOS PRIMITIVOS
// =========================

// 1 - Number [ Para todos os tipos numéricos, usamos o tipo number tanto para inteiros quanto para floats ]

let idade: number = 30;
let altura: number = 1.75;
let peso: number = 70.5;

// 2 - String

// inferência de tipo - O TypeScript infere automaticamente o tipo da variável com base no valor atribuído a ela.
let cpf = 11111111111;

let nome: string = "Gustavo Rabelo";
let cidade: string = 'São Paulo';


// 3 - Boolean
let isAdmin: boolean = true;
let isContaAtiva: boolean = false;

const checarAcesso = (admin: boolean) => {
    return admin ? "Acesso Permitido" : "Acesso Negado";
} 

console.log(checarAcesso(isAdmin));

// 4 - void (Usado principalmente em funções que não retornam nenhum valor)

const somar = (a: number, b: number) => {   
    return a + b;
}

const logMessage = (message: string): void => {
    console.log(message);
}
logMessage("Olá, TypeScript!"); 

//=========================
// TIPAGEM E RECURSOS ESSENCIAIS
//=========================

// 5 - Inferência de Tipo (O TypeScript infere automaticamente o tipo da variável com base no valor atribuído a ela.)

let city = "Rio de Janeiro"; // inferido como string
let ano = 2024; // inferido como number

// 6 - Union Types (Permite que uma variável tenha mais de um tipo)

let nota: number | string = 10;
nota = "Dez"; // Válido
