import { hash } from "bcrypt";
import { MailAdapter } from "../../adapters/mail-adapter";
import { UsersRepository } from "../../repositories/users-repositories";
import { generateToken } from "../../utils/generate-token";

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
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: RegisterUserUseCaseRequest) {
    const { name, email, password, confirmPassword, age } = request;

    //validations
    if (!name) throw new Error("O nome é obrigatório");
    if (!email) throw new Error("O e-mail é obrigatório");
    if (!password) throw new Error("A senha é obrigatória");
    if (!age) throw new Error("A idade está faltando");

    if (password != confirmPassword) throw new Error("As senhas não conferem");

    //check if user exists
    const usersAlredyExists = await this.userRepository.findUsersByNameOrEmail(name, email);

    if (usersAlredyExists.length) throw new Error("Um usuário com este nome ou e-mail já está cadastrado");

    //create new user
    const passwordHash = await hash(password, 12);
    const newUser = await this.userRepository.registerUser(name, email, passwordHash, age);

    delete newUser.password;

    //create token
    const token = await generateToken(newUser.id);

    //send confirmation email
    await this.mailAdapter.sendMail({
      to: email,
      subject: 'Confirmação de Email',
      body: [
        `<div style="font-family: sans-serif; color: #111">`,
        `<header style="text-align: center; background-color: #FF6347">`,
        `<h1 style="color: #FFF">Talent Insight</h1><br />`,
        `</header>`,
        `<p>Confirme seu endereço de e-mail</p>`,
        `</div>`
      ].join('\n')
    });

    return {
      user: newUser,
      token
    };
  }
}