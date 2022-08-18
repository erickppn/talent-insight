import { hash } from "bcrypt";
import { UsersRepository } from "../../repositories/users-repositories";

interface RegisterUserUseCaseRequest {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  age: number,
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UsersRepository,
  ) {}

  async execute(request: RegisterUserUseCaseRequest) {
    const { name, email, password, confirmPassword, age } = request;

    //validations
    if (!name) throw new Error("O nome é obrigatório");
    if (!email) throw new Error("O e-mail é obrigatório");
    if (!password) throw new Error("A senha é obrigatória");
    if (!age) throw new Error("A idade está faltando");

    if (password != confirmPassword) {
      throw new Error("As senhas não conferem");
    }

    //check if user exists
    const userAlredyExists = await this.userRepository.findUserByEmail(email);

    if (userAlredyExists?.name === name) throw new Error("Um usuário com este nome já está cadastrado!");
    if (userAlredyExists?.email === email) throw new Error("Por favor, utilize outro e-mail, este já está sendo utilizado!");

    //create new user
    const passwordHash = await hash(password, 12);
    const newUser = await this.userRepository.registerUser(name, email, passwordHash, age);

    return newUser;
  }
}