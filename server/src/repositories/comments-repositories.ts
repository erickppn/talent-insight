export interface CommentsRepository {
  sendComment: (userId: string, postId: string, content: string) => Promise<any>;
  getPostComments: (postId: string) => Promise<any>;
  deleteComment: (commentId: string) => Promise<any>;
}