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
        bannerKey: true,
        bannerUrl: true,
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

  async editProfile(userId: string, artName: string | null, aboutMe: string | null, avatarKey: string, avatarUrl: string, bannerKey: string, bannerUrl: string) {
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
        bannerUrl
      },

      select: {
        artName: true,
        aboutMe: true,
        avatarKey: true, 
        avatarUrl: true,
        bannerKey: true,
        bannerUrl: true,
      }
    });
  }
}