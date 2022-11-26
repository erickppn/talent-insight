export type comment = {
  id: string,
  content: string,
  postedAt: string,
  userId: string,
  postId: string,
  user: {
    id: string,
    name: string,
    profile: {
      artName: string | null,
      avatarUrl: string | null
    }
  }
}