import { compare } from "bcrypt";
import path from "path";
import { unlink } from "fs/promises";

import { MailAdapter } from "../../adapters/mail-adapter";
import { UserProfilesRepository } from "../../repositories/user-profiles-repositories";
import { UsersRepository } from "../../repositories/users-repositories";
import { validateToken } from "../../utils/validate-token";

interface DeleteUserUseCaseRequest {
  authToken: string | undefined,
  password: string
}

export class DeleteUserUseCase {
  constructor(
    private userRepository: UsersRepository,
    private userProfileRepository: UserProfilesRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: DeleteUserUseCaseRequest) {
    const { authToken, password } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");
    if (!password) throw new Error("A senha é necessária para executar essa ação");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error("Não foi possível encontrar as informações do usuário");

    //check if password match
    const passwordMatch = await compare(password, user.password!);

    if (!passwordMatch) throw new Error("Senha inválida");

    //delete user profile
    const profile = await this.userProfileRepository.findProfileByUserId(userId);

    if (profile?.avatarKey) {
      await unlink(path.resolve(__dirname, "../../../../tmp/uploads", profile?.avatarKey));
    }

    await this.userProfileRepository.deleteProfileByUserId(userId);

    //delete user
    await this.userRepository.deleteUserById(userId);

    //send e-mail alert
    await this.mailAdapter.sendMail({
      to: user.email,
      subject: 'Que pena que está indo embora',
      body: [
        `<div style="font-family: sans-serif; color: #111">`,
        `<header style="text-align: center; background-color: #FF6347">`,
        `<h1 style="color: #FFF">Talent Insight</h1><br />`,
        `</header>`,
        `<p>Sua conta foi deletada com sucesso</p>`,
        `</div>`
      ].join('\n')
    });
  }
}