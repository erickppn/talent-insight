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

  async findUsersByCategories(categories: string[]) {
    return await prisma.user.findMany({
      where: {
        profile: {
          categories: {
            some: {
              category: {
                name: {
                  in: categories
                }
              }
            }
          }
        }
      },

      select: {
        id: true,
        name: true,
        createdAt: true,

        profile: {
          select: {
            artName: true,
            aboutMe: true,
            avatarUrl: true,
            bannerUrl: true,

            categories: {
              select: {
                category: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
    });
  }

  async createUserFollowRelation(followedById: string, followingId: string) {
    return await prisma.user.update({
      where: {
        id: followingId,
      },

      data: {
        followedBy: {
          create: {
            followerId: followedById
          }
        }
      },

      select: {
        id: true,
        name: true,

        profile: {
          select: {
            artName: true,
            avatarUrl: true,
          }
        }
      }
    });
  };

  async getAllFollows(userId: string) {
    // const follows = await prisma.follows.findMany({
    //   where: {
    //     followerId: userId,
    //   },

    //   select: {
    //     following: {
    //       select: {
    //         id: true,
    //         name: true,

    //         profile: {
    //           select: {
    //             artName: true,
    //             avatarUrl: true,
    //           }
    //         }
    //       }
    //     }
    //   },

    //   orderBy: {
    //     following: {
    //       name: 'asc'
    //     }
    //   }
    // });

    return prisma.user.findMany({
      where: {
        followedBy: {
          some: {
            followerId: userId
          }
        }
      },

      select: {
        id: true,
        name: true,

        profile: {
          select: {
            artName: true,
            avatarUrl: true,
          }
        }
      },

      orderBy: {
        name: 'asc'
      }
    });
  };

  async deleteUserFollowRelation(followedById: string, followingId: string) {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: followedById,
          followingId: followingId
        }
      }
    });
  };
}