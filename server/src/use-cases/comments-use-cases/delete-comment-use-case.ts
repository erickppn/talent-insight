import { CommentsRepository } from "../../repositories/comments-repositories";
import { validateToken } from "../../utils/validate-token";

interface DeleteommentUseCaseRequest {
  authToken: string | undefined,
  commentId: string,
}

export class DeleteCommentUseCase {
  constructor(
    private CommentRepository: CommentsRepository,
  ) {}

  async execute(request: DeleteommentUseCaseRequest) {
    const { authToken, commentId } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //delete comment
    await this.CommentRepository.deleteComment(commentId);
  }
}