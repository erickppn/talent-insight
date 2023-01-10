import express from "express";
import multer from "multer";

//repositories and adapters imports
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { PrismaUserProfilesRepository } from "./repositories/prisma/prisma-user-profiles-repository";
import { PrismaPostsRepository } from "./repositories/prisma/prisma-posts-repository";
import { PrismaCommentsRepository } from "./repositories/prisma/prisma-comments-repository";

import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

//use cases imports
import { RegisterUserUseCase } from "./use-cases/user-use-cases/register-user-use-case";
import { AuthenticateUserUseCase } from "./use-cases/auth-use-cases/authenticate-user-use-case";
import { ValidateUserTokenUseCase } from "./use-cases/auth-use-cases/validate-user-token-use-case";
import { ChangeUserPasswordUseCase } from "./use-cases/user-use-cases/change-password-use-case";
import { DeleteUserUseCase } from "./use-cases/user-use-cases/delete-user-use-case";
import { EditUserProfileUseCase } from "./use-cases/profile-use-cases/edit-user-profile-use-case";
import { EditUserUseCase } from "./use-cases/user-use-cases/edit-user-use-case";
import { SendPostUseCase } from "./use-cases/posts-use-cases/send-post-use-case";
import { GetPostByIdUseCase } from "./use-cases/posts-use-cases/get-post-by-id-use-case";
import { SendCommentUseCase } from "./use-cases/comments-use-cases/send-comment-use-case";
import { GetCommentsUseCase } from "./use-cases/comments-use-cases/get-comments-use-case";
import { DeleteCommentUseCase } from "./use-cases/comments-use-cases/delete-comment-use-case";
import { GetUserRelatedPostsUseCase } from "./use-cases/posts-use-cases/get-user-related-posts-use-case";
import { GetPostsAndUsersByCategories } from "./use-cases/categories-use-cases/get-posts-and-profiles-by-categories";
import { FollowUser } from "./use-cases/user-use-cases/follow-user";
import { UnfollowUser } from "./use-cases/user-use-cases/unfollow-user";

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

routes.put('/user/password', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { currentPassword, newPassword } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository;
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const changeUserPasswordUseCase = new ChangeUserPasswordUseCase(
    prismaUsersRepository,
    nodeMailerMailAdapter
  );

  await changeUserPasswordUseCase.execute({
    authToken,
    currentPassword,
    newPassword
  });

  res.status(200).json({
    error: false
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

  return res.json({
    error: false,
    message: "Conta deletada com sucesso",
  });
});

routes.put('/user/profile/', authMiddleware, upload.fields([{ name: "avatar", maxCount: 1 }, { name: "banner", maxCount: 1 }]), async (req, res) => {
  const authToken = req.headers["authorization"];
  const { artName, aboutMe, categories } = req.body;
  const files = req.files;

  if(!files || Array.isArray(files)) throw new Error("error receiving files");

  const avatarKey = files.avatar !== undefined ? files.avatar[0].filename : null;
  const bannerKey = files.banner !== undefined ? files.banner[0].filename : null;

  const prismaUserProfilesRepository = new PrismaUserProfilesRepository();

  const editUserProfileUseCase = new EditUserProfileUseCase(
    prismaUserProfilesRepository
  );

  const newUserProfileInfo = await editUserProfileUseCase.execute({ 
    authToken, 
    artName, 
    aboutMe,
    avatarKey,
    bannerKey,
    categories
  });

  res.status(200).json({
    newUserProfileInfo
  });
});

routes.post('/user/:id/follow', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { id: followingId } = req.params;
  
  const prismaUsersRepository = new PrismaUsersRepository();

  const followUserUseCase = new FollowUser(
    prismaUsersRepository
  );

  const newFollows = await followUserUseCase.execute({authToken, followingId});

  res.status(200).json(newFollows);
});


routes.delete('/user/:id/unfollow', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { id: followingId } = req.params;

  const prismaUsersRepository = new PrismaUsersRepository();

  const unfollowUserUseCase = new UnfollowUser(
    prismaUsersRepository
  );

  const success = await unfollowUserUseCase.execute({authToken, followingId});

  res.status(200).json(success);
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

  const { user, userProfile, follows, token } = await authenticateUserUseCase.execute({ email, password });

  return res.status(200).json({
    message: "Login feito com sucesso",
    user,
    userProfile,
    follows,
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

  const { user, userProfile, follows } = await validateUserTokenUseCase.execute(authToken);
  
  return res.status(201).json({ 
    user,
    userProfile,
    follows
  });
});

//posts routes
routes.post('/send', authMiddleware, upload.fields([ { name: "thumbnail", maxCount: 1 }, { name: "attachments", maxCount: 4 } ]), async (req, res) => {
  const authToken = req.headers["authorization"];
  const { title, description, type, categories } = req.body;
  const files = req.files;

  if(!files || Array.isArray(files)) throw new Error("error receiving files");

  const thumbnailKey = files.thumbnail !== undefined ? files.thumbnail[0].filename : null;
  const { attachments } = files;

  
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaPostRespository = new PrismaPostsRepository();

  const sendPostUseCase = new SendPostUseCase(
    prismaUsersRepository,
    prismaPostRespository,
  );

  const postId = await sendPostUseCase.execute({
    authToken,
    title,
    description,
    type,
    thumbnailKey,
    attachments,
    categories
  });

  res.status(200).json(postId);
});

routes.get('/post/:id', async (req, res) => {
  const { id } = req.params;

  const prismaPostsRepository = new PrismaPostsRepository();

  const getPostByIdUseCase = new GetPostByIdUseCase(
    prismaPostsRepository,
  );

  const post = await getPostByIdUseCase.execute(id);

  res.json(post);
});

routes.get('/post/:id/related', async (req, res) => {
  const { id } = req.params;

  const prismaPostRespository = new PrismaPostsRepository();

  const getUserRelatedPostsUseCase = new GetUserRelatedPostsUseCase(
    prismaPostRespository,
  );

  const relatedPosts = await getUserRelatedPostsUseCase.execute(id);

  res.status(200).json(relatedPosts);
});

routes.get('/search=:categoriesInUrl', async (req, res) => {
  const { categoriesInUrl } = req.params;

  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaPostRespository = new PrismaPostsRepository();

  const getPostsAndProfilesByCategories = new GetPostsAndUsersByCategories(
    prismaUsersRepository,
    prismaPostRespository
  );

  const postsAndProfiles = await getPostsAndProfilesByCategories.execute(categoriesInUrl);

  res.status(200).json(postsAndProfiles);
});

//comments routes
routes.post('/post/:id/comment', authMiddleware, async (req, res) => {
  const authToken = req.headers["authorization"];
  const { id } = req.params;
  const { content } = req.body;

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const prismaPostRespository = new PrismaPostsRepository();

  const sendCommentUseCase = new SendCommentUseCase(
    prismaCommentsRepository,
    prismaPostRespository
  );

  const comment = await sendCommentUseCase.execute({ authToken, postId: id, content });

  res.status(200).json(comment);
});

routes.get('/post/:id/comments', async (req, res) => {
  const { id: postId } = req.params;

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const prismaPostRespository = new PrismaPostsRepository();

  const getCommentsUseCase = new GetCommentsUseCase(
    prismaCommentsRepository,
    prismaPostRespository
  );

  const comments = await getCommentsUseCase.execute(postId);

  res.status(200).json(comments);
});

routes.delete('/post/:id/comment', async (req, res) => {
  const authToken = req.headers["authorization"];
  const { commentId } = req.body;

  const prismaCommentsRepository = new PrismaCommentsRepository();

  const deleteCommentUseCase = new DeleteCommentUseCase(
    prismaCommentsRepository,
  );

  await deleteCommentUseCase.execute({authToken, commentId});

  res.status(200).json();
});