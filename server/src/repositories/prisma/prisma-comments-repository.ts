import { prisma } from "../../prisma";
import { CommentsRepository } from "../comments-repositories";

export class PrismaCommentsRepository implements CommentsRepository {
  
  async sendComment(userId: string, postId: string, content: string) {
    return await prisma.comment.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },

        post: {
          connect: {
            id: postId
          }
        },

        content
      },

      include: {
        user: {
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
        }
      }
    });
  }

  async getPostComments(postId: string) {
    return await prisma.comment.findMany({
      where: {
        postId
      },

      include: {
        user: {
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
        }
      },

      orderBy: {
        postedAt: 'desc'
      }
    })
  }

  async deleteComment(commentId: string) {
    await prisma.comment.delete({
      where: {
        id: commentId,
      }
    });
  }
}