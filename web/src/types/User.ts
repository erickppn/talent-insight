export type User = {
  id: string,
  name: string,
  email: string,
  age: string,
  isActive: boolean,
}

export type Profile = {
  artName: string | null, 
  aboutMe: string | null, 
  avatarImgPath: string | null
}