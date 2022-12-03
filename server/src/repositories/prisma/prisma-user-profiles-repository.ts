import { prisma } from "../../prisma";
import { UserProfilesRepository } from "../user-profiles-repositories";

export class PrismaUserProfilesRepository implements UserProfilesRepository {
  async findProfileByUserId(userId: string) {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },

      include: {
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
    });
  }

  async deleteProfileByUserId(userId: string) {
    await prisma.profile.delete({
      where: {
        userId
      }
    })
  }

  async deleteAllProfileCategories(profileId: string) {
    await prisma.profileCategories.deleteMany({
      where: {
        profileId: profileId
      }
    })
  }

  async editProfile(userId: string, artName: string | null, aboutMe: string | null, avatarKey: string, avatarUrl: string, bannerKey: string, bannerUrl: string, categoriesList: string[]) {
    const categories = categoriesList.map(category => {
      return {
        category: {
          connectOrCreate: {
            create: {
              name: category,
            },
            where: {
              name: category
            }
          }
        }
      }
    });
    
    return prisma.profile.update({
      where: {
        userId,
      },

      data: {
        artName,
        aboutMe,
        avatarKey,
        avatarUrl,
        bannerKey,
        bannerUrl,

        categories: {
          deleteMany: [
            {categoryId: 2, profileId: ''}
          ],
          
          create: categories
        }
      },

      include: {
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
    });
  }
}