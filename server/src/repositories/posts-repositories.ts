export type Attachment = {
  attachmentKey: string,
  attachmentUrl: string,
}

export interface PostsRepository {
  sendPost: (
    userId: string,
    title: string, 
    description: string | null,
    thumbnailKey: string | null,
    thumbnailUrl: string | null,
    
    postAttachments: Attachment[]
  ) => Promise<any>
}
