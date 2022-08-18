import express from "express";

//repositories and adapters imports
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

//use cases imports
import { RegisterUserUseCase } from "./use-cases/register-user/register-user-use-case";

//repositories and adapters instances
const prismaUsersRepository = new PrismaUsersRepository();
const nodeMailerMailAdapter = new NodeMailerMailAdapter();

export const routes = express.Router();

//authentication routes
routes.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmPassword, age } = req.body;

  const registerUserUseCase = new RegisterUserUseCase(
    prismaUsersRepository,
    nodeMailerMailAdapter
  );

  const user = await registerUserUseCase.execute({
    name, 
    email, 
    password, 
    confirmPassword, 
    age
  });

  return res.status(201).json({
    message: "Usuário criado com sucesso",
    user,
  });
});

routes.get('/', (req, res) => {
  res.status(200).json({msg: "Bem vindo a nossa API"});
});