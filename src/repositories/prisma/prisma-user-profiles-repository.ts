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

  async deleteProfileByUserId(userId: String) {
    await prisma.profile.delete({
      where: {
        userId
      }
    })
  }
}