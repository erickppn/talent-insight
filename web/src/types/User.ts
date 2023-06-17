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
  createdAt: string,

  profile: {
    artName: string | null, 
    aboutMe: string | null, 
    avatarUrl: string | null,
    bannerUrl: string | null,

    categories: { category: { name: string } }[]
  }
}