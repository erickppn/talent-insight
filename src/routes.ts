import express from "express";

//repositories imports
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";

//use cases imports
import { RegisterUserUseCase } from "./use-cases/register-user/register-user-use-case";

//Repository instance
const prismaUsersRepository = new PrismaUsersRepository();

export const routes = express.Router();

//authentication routes
routes.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmPassword, age } = req.body;

  const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository);

  const newUser = await registerUserUseCase.execute({
    name, 
    email, 
    password, 
    confirmPassword, 
    age
  });

  return res.status(201).json({
    message: "Usuário criado com sucesso",
    newUser,
  });
});

routes.get('/', (req, res) => {
  res.status(200).json({msg: "Bem vindo a nossa API"});
});