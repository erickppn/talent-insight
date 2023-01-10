import { UsersRepository } from "../../repositories/users-repositories";
import { validateToken } from "../../utils/validate-token";

interface FollowUserRequest {
  authToken: string | undefined,
  followingId: string
}

export class FollowUser {
  constructor(
    private userRepository: UsersRepository,
  ) {}

  async execute(request: FollowUserRequest) {
    const { authToken, followingId } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    if (userId === followingId) throw new Error("Não é possível seguir você mesmo!");

    //verify if the following user exists
    const userToFollow = await this.userRepository.findUserById(followingId);
    if (!userToFollow) throw new Error("Não é possível seguir este usuário pois ele não existe");

    const followingUser = await this.userRepository.createUserFollowRelation(userId, followingId);

    return followingUser;
  }
}