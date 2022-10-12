import { UsersRepository } from "../../../repositories/users-repositories";
import { UserProfilesRepository } from "../../../repositories/user-profiles-repositories";
import { validateToken } from "../../../utils/validate-token";

export class ValidateUserTokenUseCase {
  constructor(
    private userRepository: UsersRepository,
    private userProfileRepository: UserProfilesRepository
  ) {}

  async execute(authToken: string | undefined) {
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //get user infos
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error("Não foi possível buscar as informações do usuário");

    delete user.password;

    //get user profile info
    const userProfile = await this.userProfileRepository.findProfileByUserId(user.id);

    return {
      user,
      userProfile
    };
  }
}