import { prisma } from "../../prisma";
import { UserProfilesRepository } from "../user-profiles-repositories";

export class PrismaUserProfilesRepository implements UserProfilesRepository {
  async findProfileByUserId(userId: string) {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },

      select: {
        artName: true,
        aboutMe: true,
        avatarKey: true, 
        avatarUrl: true,
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

  async editProfile(userId: string, artName: string | null, aboutMe: string | null, avatarKey: string, avatarUrl: string) {
    return prisma.profile.update({
      where: {
        userId,
      },

      data: {
        artName,
        aboutMe,
        avatarKey,
        avatarUrl,
      },

      select: {
        artName: true,
        aboutMe: true,
        avatarKey: true, 
        avatarUrl: true,
      }
    });
  }
}