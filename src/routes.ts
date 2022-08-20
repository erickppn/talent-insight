import express from "express";

//repositories and adapters imports
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

//use cases imports
import { RegisterUserUseCase } from "./use-cases/register-user/register-user-use-case";
import { AuthenticateUserUseCase } from "./use-cases/authenticate-user/authenticate-user-use-case";
import { ValidateUserTokenUseCase } from "./use-cases/validate-user-token/validate-user-token-use-case";
import { DeleteUserUseCase } from "./use-cases/delete-user/delete-user-use-case";

//middlewares imports
import { authMiddleware } from "./middlewares/auth-middleware";

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

routes.get('/auth/validate-token', async (req, res) => {
  const authToken = req.headers["authorization"];

  const validateUserTokenUseCase = new ValidateUserTokenUseCase(prismaUsersRepository);
  const user = await validateUserTokenUseCase.execute(authToken);
  
  return res.status(201).json({ user });
});

routes.delete('/user', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { password } = req.body;

  const deleteUserUseCase = new DeleteUserUseCase(
    prismaUsersRepository,
    nodeMailerMailAdapter
  );

  await deleteUserUseCase.execute({ authToken, password });

  return res.status(400).json({
    message: "Conta deletada com sucesso",
  });

});


routes.get('/private', authMiddleware, async (req, res) => {
  res.json({
    foo: 'bar'
  })
})

routes.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});