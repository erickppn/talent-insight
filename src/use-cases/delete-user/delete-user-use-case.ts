import { UsersRepository } from "../../repositories/users-repositories";
import { validateToken } from "../../utils/validate-token";

export class DeleteUserUseCase {
  constructor(
    private userRepository: UsersRepository
  ) {}

  async execute(authToken: string | undefined) {
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    await this.userRepository.deleteUserById(userId);
  }
}