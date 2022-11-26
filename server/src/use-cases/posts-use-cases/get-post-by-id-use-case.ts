import { PostsRepository } from "../../repositories/posts-repositories";

export class GetPostByIdUseCase {
  constructor(
    private postRepository: PostsRepository
  ) {}

  async execute(postId: string) {

    //get post
    const post = await this.postRepository.getPostById(postId);

    //verify if post exists
    if (!post) throw new Error("Este post não existe!");

    return post;
  }
}