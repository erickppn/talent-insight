import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { PostsRepository } from "../posts-repositories";
import { Attachment } from "../posts-repositories";

export class PrismaPostsRepository implements PostsRepository {
  async sendPost(userId: string, title: string, description: string | null, type: string, thumbnailKey: string | null, thumbnailUrl: string | null, postAttachments: Attachment[]) {
    const includeAttachments = postAttachments ? true : false;

    let postData: Prisma.PostCreateInput = {
      user: {
        connect: {
          id: userId
        }
      },

      title,
      description,
      type,
      thumbnailKey,
      thumbnailUrl,
    }

    if (includeAttachments) {
      postData = {
        ...postData,

        attachments: {
          createMany: {
            data: postAttachments
          }
        }
      };
    }

    const post = await prisma.post.create({
      data: postData,

      include: {
        attachments: true,
      }
    });

    return post.id;
  }

  async getPostById(postId: string) {
    return await prisma.post.findUnique({
      where: { 
        id: postId 
      },

      include: {
        attachments: true,

        user: {
          select: {
            name: true,
            profile: {
              select: {
                artName: true,
                avatarUrl: true,
                aboutMe: true,
              }
            }
          }
        }
      },
    });
  }

  async getUserRelatedPosts(userId: string) {
    return prisma.post.findMany({
      where: {
        userId,
      },

      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        postedAt: true,
      },

      take: 5,
      orderBy: { 
        postedAt: "desc"
       }
    });
  }
}