import { verify } from "jsonwebtoken";
import { UsersRepository } from "../../repositories/users-repositories";

export class ValidateUserToken {
  constructor(
    private userRepository: UsersRepository,
  ) {}

  async execute(authToken: string | undefined) {
    const secret = process.env.JWT_SECRET_KEY || 'secret';

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    const tokenParts = authToken.split(" ");
    if (tokenParts.length !== 2) throw new Error("Token não fornecido da maneira correta");

    const [bearer, token] = tokenParts;

    if (bearer !== "Bearer") throw new Error("Token mal formatado");

    //verify token validity
    const verifiedToken = verify(token, secret);
    const userId = verifiedToken.sub;

    if (!userId) throw new Error("Não foi possível validar o token");

    //get user infos
    const user = await this.userRepository.findUserById(userId.toString());
    if (!user) throw new Error("Não foi possível buscar as informações do usuário");

    delete user.password;

    return user;
  }
}