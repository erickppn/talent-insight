import { MailAdapter } from "../../adapters/mail-adapter";
import { UsersRepository } from "../../repositories/users-repositories";
import { validateToken } from "../../utils/validate-token";

interface EditUserAccountUseCaseRequest {
  authToken: string | undefined,
  name: string ,
  email: string,
  password: string,
  age: number,
}

export class EditUserAccountUseCase {
  constructor (
    private userRepository: UsersRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: EditUserAccountUseCaseRequest) {
    const { authToken, name, email, password, age } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    const newUserAccountInfo = await this.userRepository.editUser(userId, name, email, password, age);

    return newUserAccountInfo;
  }
}