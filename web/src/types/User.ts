export type User = {
  id: string,
  name: string,
  email: string,
  age: number,
  isActive: boolean,
}

export type Profile = {
  artName: string | null, 
  aboutMe: string | null, 
  avatarUrl: string | null
}