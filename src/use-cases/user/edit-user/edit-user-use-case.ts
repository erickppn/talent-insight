import { hash } from "bcrypt";
import { MailAdapter } from "../../../adapters/mail-adapter";
import { UsersRepository } from "../../../repositories/users-repositories";
import { validateToken } from "../../../utils/validate-token";

interface EditUserAccountUseCaseRequest {
  authToken: string | undefined,
  name: string ,
  email: string,
  password: string,
  age: number,
}

export class EditUserUseCase {
  constructor (
    private userRepository: UsersRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: EditUserAccountUseCaseRequest) {
    const { authToken, name, email, password, age } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");
    if (!email) throw new Error("O e-mail está faltando!");

    if (password && password.length < 8) {
      throw new Error("A senha deve conter pelo menos 8 digitos");
    }

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //get user infos
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error("Não foi possível buscar as informações do usuário");

    //check if there are already user accounts with the new data
    const existingUsers = await this.userRepository.findUsersByNameAndEmail(name, email);

    existingUsers.forEach((existingUser) => {
      if (existingUser.id !== user.id) {
        if (existingUser.name === name) throw new Error("Este nome já está sendo utilizado");
        if (existingUser.email === email) throw new Error("Este e-mail já pertence a uma conta");
      }
    });

    //generate new password
    let newPassword = user.password;

    if (password && password != null) {
      newPassword = await hash(password, 12);
    }

    //save new user account info
    const newUserAccountInfo = await this.userRepository.editUser(userId, name, email, newPassword!, age);

    //send confirmation email
    if (newUserAccountInfo.email != user.email) {
      await this.mailAdapter.sendMail({
        to: email,
        subject: 'Alteração de Email',
        body: [
          `<div style="font-family: sans-serif; color: #111">`,
          `<header style="text-align: center; background-color: #FF6347">`,
          `<h1 style="color: #FFF">Talent Insight</h1><br />`,
          `</header>`,
          `<p>Seu endereço de e-mail foi alterado</p>`,
          `</div>`
        ].join('\n')
      });
    }

    return newUserAccountInfo;
  }
}