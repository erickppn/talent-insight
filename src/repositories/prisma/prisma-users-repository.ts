import { prisma } from "../../prisma";
import { UsersRepository } from "../users-repositories";

export class PrismaUsersRepository implements UsersRepository {
  async registerUser(name: string, email: string, password: string, age: number) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        age
      }
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ 
      where: {
        email 
      }
    });
  }
}