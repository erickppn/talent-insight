type UserResponseInfo = {
  id: string,
  name: string,
  email: string,
  artName: string | null,
  aboutMe: string | null,
  age: number,
  avatarImgPath: string | null,
  password?: string,
}

export interface UsersRepository {
  registerUser: (name: string, email: string, password: string, age: number) => Promise<UserResponseInfo>;
  findUserByEmail: (email: string) => Promise<UserResponseInfo | null>;
}