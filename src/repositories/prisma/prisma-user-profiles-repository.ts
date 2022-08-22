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
        avatarImgPath: true,
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

  async editProfile(userId: string, artName: string | null, aboutMe: string | null) {
    return prisma.profile.update({
      where: {
        userId,
      },

      data: {
        artName,
        aboutMe
      },

      select: {
        artName: true,
        aboutMe: true,
        avatarImgPath: true,
      }
    });
  }
}