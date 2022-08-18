import { UsersRepository } from "../../repositories/users-repositories";
import { compare } from "bcrypt";
import { generateToken } from "../../utils/generate-token";

interface LoginUserUseCaseRequest {
  email: string,
  password: string
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UsersRepository,
  ) {}

  async execute(request: LoginUserUseCaseRequest) {
    const { email, password } = request;

    //validations
    if (!email) throw new Error("O e-mail é obrigatório");
    if (!password) throw new Error("A senha é obrigatória");

    //check if user exists
    const userAlredyExists = await this.userRepository.findUserByEmail(email);

    if (!userAlredyExists) throw new Error("E-mail ou Senha incorretos");

    //check if password match
    const passwordMatch = await compare(password, userAlredyExists.password!);

    if (!passwordMatch) {
      throw new Error("E-mail ou Senha incorretos");
    }

    delete userAlredyExists.password;

    //create token
    const token = await generateToken(userAlredyExists.id);

    return {
      user: userAlredyExists,
      token
    }
  }
}