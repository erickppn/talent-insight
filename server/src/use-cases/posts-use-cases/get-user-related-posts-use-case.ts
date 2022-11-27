import { PostsRepository } from "../../repositories/posts-repositories";

export class GetUserRelatedPostsUseCase {
  constructor(
    private postRepository: PostsRepository
  ) {}

  async execute(userId: string) {
    const relatedPosts = await this.postRepository.getUserRelatedPosts(userId);

    return relatedPosts;
  }
}