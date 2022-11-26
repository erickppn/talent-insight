import { CommentsRepository } from "../../repositories/comments-repositories";
import { PostsRepository } from "../../repositories/posts-repositories";

export class GetCommentsUseCase {
  constructor(
    private CommentRepository: CommentsRepository,
    private PostRepository: PostsRepository
  ) {}

  async execute(postId: string) {
    if(!postId) throw new Error("Id do post não fornecido");

    //verify if post exists
    const existentPost = await this.PostRepository.getPostById(postId);
    if (!existentPost) throw new Error("Esse post não existe!");

    const comments = await this.CommentRepository.getPostComments(postId);

    return comments;
  }
}