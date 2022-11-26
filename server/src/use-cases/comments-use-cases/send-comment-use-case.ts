import { CommentsRepository } from "../../repositories/comments-repositories";
import { PostsRepository } from "../../repositories/posts-repositories";
import { validateToken } from "../../utils/validate-token";

interface SendCommentUseCaseRequest {
  authToken: string | undefined,
  postId: string,
  content: string,
}

export class SendCommentUseCase {
  constructor(
    private CommentRepository: CommentsRepository,
    private PostRepository: PostsRepository,
  ) {}

  async execute(request: SendCommentUseCaseRequest) {
    const { authToken, postId, content } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    if(!postId) throw new Error("Id do post não fornecido");

    //verify if post exists
    const existentPost = await this.PostRepository.getPostById(postId);

    if (!existentPost) throw new Error("Esse post não existe!");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //create comment
    const comment = await this.CommentRepository.sendComment(userId, postId, content);

    return comment;
  }
}