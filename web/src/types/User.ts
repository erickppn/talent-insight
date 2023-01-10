export type User = {
  id: string,
  name: string,
  email: string,
  age: number,
  isActive: boolean,
  createdAt: string,
}

export type PublicUserInfo = {
  id: string,
  name: string,

  profile: {
    artName: string | null,
    avatarUrl: string | null,
  }
}