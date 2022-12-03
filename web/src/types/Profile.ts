export type Profile = {
  id: string | null,
  artName: string | null, 
  aboutMe: string | null, 
  avatarUrl: string | null,
  bannerUrl: string | null,

  categories: { category: { name: string } }[]
}