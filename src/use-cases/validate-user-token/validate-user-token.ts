import { UsersRepository } from "../../repositories/users-repositories";
import { validateToken } from "../../utils/validate-token";

export class ValidateUserToken {
  constructor(
    private userRepository: UsersRepository,
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

    return user;
  }
}