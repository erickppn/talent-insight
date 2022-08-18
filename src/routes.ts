import express from "express";

//repositories and adapters imports
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

//use cases imports
import { RegisterUserUseCase } from "./use-cases/register-user/register-user-use-case";
import { AuthenticateUserUseCase } from "./use-cases/authenticate-user/authenticate-user-use-case";

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

  const { user, token } = await registerUserUseCase.execute({ name, email, password, confirmPassword, age });

  return res.status(201).json({
    message: "Usuário criado com sucesso",
    user,
    token
  });
});

routes.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository);

  const { user, token } = await authenticateUserUseCase.execute({ email, password });

  return res.status(200).json({
    message: "Login feito com sucesso",
    user,
    token
  });
});

routes.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});