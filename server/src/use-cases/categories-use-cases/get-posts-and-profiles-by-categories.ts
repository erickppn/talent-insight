import { PostsRepository } from "../../repositories/posts-repositories";
import { UsersRepository } from "../../repositories/users-repositories";

export class GetPostsAndUsersByCategories {
  constructor(
    private userRepository: UsersRepository,
    private postRepository: PostsRepository
  ) {}

  async execute(categoriesInUrl: string) {
    //create array with the tags
    const categories = categoriesInUrl.split(";");

    //get users by categories
    const users = await this.userRepository.findUsersByCategories(categories);

    //get posts by categories
    const posts = await this.postRepository.findPostsByCategories(categories);

    return {
      users,
      posts,
    };
  }
}