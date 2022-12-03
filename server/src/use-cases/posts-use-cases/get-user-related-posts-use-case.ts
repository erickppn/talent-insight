import { PostsRepository } from "../../repositories/posts-repositories";

export class GetUserRelatedPostsUseCase {
  constructor(
    private postRepository: PostsRepository
  ) {}

  async execute(id: string) {
    //get author post by postId
    const userId = await this.postRepository.getPostAuthor(id);

    if (!userId) throw new Error("Não foi possível encontrar este usuário");

    //get related posts by user id
    const relatedPosts = await this.postRepository.getUserRelatedPosts(userId, id);
    

    return relatedPosts;
  }
}