import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { PostsRepository } from "../posts-repositories";
import { Attachment } from "../posts-repositories";

export class PrismaPostsRepository implements PostsRepository {
  async sendPost(userId: string, title: string, description: string | null, thumbnailKey: string | null, thumbnailUrl: string | null, postAttachments: Attachment[]) {
    const includeAttachments = postAttachments ? true : false;

    let postData: Prisma.PostCreateInput = {
      user: {
        connect: {
          id: userId
        }
      },

      title,
      description,
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

    return await prisma.post.create({
      data: postData,

      include: {
        attachments: true,
      }
    });
  }
}