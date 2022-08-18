import { prisma } from "../../prisma";
import { UsersRepository } from "../users-repositories";

export class PrismaUsersRepository implements UsersRepository {
  async registerUser(name: string, email: string, password: string, age: number) {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        age
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
      }
    });

    return newUser;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ 
      where: {
        email 
      },
    });

    return user;
  }
}