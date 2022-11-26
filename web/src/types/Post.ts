export type attachment = {
  id: string,
  attachmentKey: string,
  attachmentUrl: string,
  postId: string
}

export type post = {
  id: string,
  type: "images" | "video",
	title: string,
	description: string,
	thumbnailKey: string,
	thumbnailUrl: string,
	postedAt: string,
	likes: number,
	userId: string,

  attachments: attachment[],

  user: {
    name: string,
    profile: {
      artName: string,
      avatarUrl: string,
      aboutMe: string,
    },
  }
}