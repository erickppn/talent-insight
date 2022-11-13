import { compare, hash } from "bcrypt";
import { MailAdapter } from "../../../adapters/mail-adapter";
import { UsersRepository } from "../../../repositories/users-repositories";
import { validateToken } from "../../../utils/validate-token";

interface ChangePasswordtUseCaseRequest {
  authToken: string | undefined,
  currentPassword: string,
  newPassword: string,
}

export class ChangeUserPasswordUseCase {
  constructor(
    private userRepository: UsersRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: ChangePasswordtUseCaseRequest) {
    const { authToken, currentPassword, newPassword } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    if (newPassword && newPassword.length < 8) {
      throw new Error("A senha deve conter pelo menos 8 digitos");
    }

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //get user infos
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error("Não foi possível buscar as informações do usuário");

    //check if password match
    const passwordMatch = await compare(currentPassword, user.password!);

    if (!passwordMatch) throw new Error("Senha incorreta");

    //generate new password
    const passwordHash = await hash(newPassword, 12);

    await this.userRepository.changeUserPassword(userId, passwordHash);

    //send confirmation email
    await this.mailAdapter.sendMail({
      to: user.email,
      subject: 'Alteração de Senha',
      body: [
        `<div style="font-family: sans-serif; color: #111">`,
        `<header style="text-align: center; background-color: #FF6347">`,
        `<h1 style="color: #FFF">Talent Insight</h1><br />`,
        `</header>`,
        `<p>Sua senha foi alterada</p>`,
        `</div>`
      ].join('\n')
    });

    return true;
  }
}