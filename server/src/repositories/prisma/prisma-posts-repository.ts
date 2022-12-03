import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { PostsRepository } from "../posts-repositories";
import { Attachment } from "../posts-repositories";

export class PrismaPostsRepository implements PostsRepository {
  async sendPost(userId: string, title: string, description: string | null, type: string, thumbnailKey: string | null, thumbnailUrl: string | null, postAttachments: Attachment[], categoriesList: string[]) {
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

    if (categoriesList.length !== 0) {
      postData = {
        ...postData,

        categories: {
          create: categories
        }
      }
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
        categories: {
          select: {
            category: {
              select: {
                name: true
              }
            }
          }
        },

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

  async getPostAuthor(postId: string) {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },

      select: {
        userId: true
      }
    });

    return post?.userId;
  }

  async getUserRelatedPosts(userId: string, id: string) {
    return prisma.post.findMany({
      where: {
        userId,
        NOT: {
          id,
        }
      },

      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        postedAt: true,
        type: true,

        attachments: {
          take: 1
        },
      },

      take: 5,
      orderBy: { 
        postedAt: "desc"
      },
    });
  }

  async findPostsByCategories(categories: string[]) {
    return await prisma.post.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: {
                in: categories
              }
            }
          }
        }
      },

      select: { 
        id: true,
        title: true,
        thumbnailUrl: true,
        postedAt: true,
        likes: true,
        type: true,
        attachments: {
          take: 1
        },
        
        user: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                artName: true,
                avatarUrl: true,
                bannerUrl: true,
              }
            }
          }
        }
      }
    });
  }
}