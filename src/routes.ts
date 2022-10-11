import express from "express";
import multer from "multer";

//repositories and adapters imports
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { PrismaUserProfilesRepository } from "./repositories/prisma/prisma-user-profiles-repository";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

//use cases imports
import { RegisterUserUseCase } from "./use-cases/user/register-user/register-user-use-case";
import { AuthenticateUserUseCase } from "./use-cases/auth/authenticate-user/authenticate-user-use-case";
import { ValidateUserTokenUseCase } from "./use-cases/auth/validate-user-token/validate-user-token-use-case";
import { DeleteUserUseCase } from "./use-cases/user/delete-user/delete-user-use-case";
import { EditUserProfileUseCase } from "./use-cases/user-profile/edit-user-profile/edit-user-profile-use-case";
import { EditUserUseCase } from "./use-cases/user/edit-user/edit-user-use-case";

//middlewares imports
import { authMiddleware } from "./middlewares/auth-middleware";

//configs and other imports
import { multerConfg } from "./config/multer";

const upload = multer(multerConfg);

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem vindo(a) a nossa API" });
});

//user routes
routes.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmPassword, age } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

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

routes.put('/user', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { name, email, password, age } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const editUserUseCase = new EditUserUseCase(
    prismaUsersRepository,
    nodeMailerMailAdapter
  );

  const newUserAccountInfo = await editUserUseCase.execute({ 
    authToken,
    name, 
    email, 
    password, 
    age
  });

  res.status(200).json({
    newUserAccountInfo
  });
});

routes.delete('/user', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { password } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaUserProfilesRepository = new PrismaUserProfilesRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const deleteUserUseCase = new DeleteUserUseCase(
    prismaUsersRepository,
    prismaUserProfilesRepository,
    nodeMailerMailAdapter
  );

  await deleteUserUseCase.execute({ authToken, password });

  return res.status(400).json({
    message: "Conta deletada com sucesso",
  });

});

routes.put('/user/profile/', authMiddleware, upload.single("avatar"), async (req, res) => {
  const authToken = req.headers["authorization"];
  const { artName, aboutMe } = req.body;
  
  if (!req.file) return console.log("Arquivo não fornecido");
  const { filename: avatarKey } = req.file;

  const prismaUserProfilesRepository = new PrismaUserProfilesRepository();

  const editUserProfileUseCase = new EditUserProfileUseCase(
    prismaUserProfilesRepository
  );

  const newUserProfileInfo = await editUserProfileUseCase.execute({ 
    authToken, 
    artName, 
    aboutMe,
    avatarKey
  });

  res.status(200).json({
    newUserProfileInfo
  });
});

//authentication routes
routes.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaUserProfilesRepository = new PrismaUserProfilesRepository();

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    prismaUsersRepository,
    prismaUserProfilesRepository
  );

  const { user, userProfile, token } = await authenticateUserUseCase.execute({ email, password });

  return res.status(200).json({
    message: "Login feito com sucesso",
    user,
    userProfile,
    token
  });
});

routes.get('/auth/validate-token', async (req, res) => {
  const authToken = req.headers["authorization"];

  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaUserProfilesRepository = new PrismaUserProfilesRepository();

  const validateUserTokenUseCase = new ValidateUserTokenUseCase(
    prismaUsersRepository,
    prismaUserProfilesRepository
  );

  const { user, userProfile } = await validateUserTokenUseCase.execute(authToken);
  
  return res.status(201).json({ 
    user,
    userProfile
  });
});