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

  async findUsersByNameOrEmail(name: string, email: string) {
    return await prisma.user.findMany({
      where: {
        OR: [ { email }, { name } ]
      },
      select: {
        name: true,
        email: true
      }
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ 
      where: {
        email,
      }
    });
  }

  async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async deleteUserById(id: string) {
    await prisma.user.delete({
      where: {
        id
      }
    });
  }
}