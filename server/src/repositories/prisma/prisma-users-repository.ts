import { prisma } from "../../prisma";
import { UsersRepository } from "../users-repositories";

export class PrismaUsersRepository implements UsersRepository {
  async registerUser(name: string, email: string, password: string, age: number) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        age,

        profile: {
          create: { }
        }
      }
    });
  }

  async findUsersByNameAndEmail(name: string, email: string) {
    return await prisma.user.findMany({
      where: {
        OR: [ { email }, { name } ]
      },
      select: {
        id: true,
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

  async editUser(id: string, name: string, email: string, password: string, age: number) {
    return await prisma.user.update({
      where: {
        id
      },

      data: {
        name,
        email,
        password,
        age
      }
    });
  }

  async changeUserPassword(id: string, newPassword: string) {
    return await prisma.user.update({
      where: {
        id
      },
      
      data: {
        password: newPassword
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