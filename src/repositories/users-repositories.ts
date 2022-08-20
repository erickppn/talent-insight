type UserInfoResponse = {
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
  registerUser: (name: string, email: string, password: string, age: number) => Promise<UserInfoResponse>;
  findUserByEmail: (email: string) => Promise<UserInfoResponse | null>;
  findUserById: (id: string) => Promise<UserInfoResponse | null>;
  deleteUserById: (id: string) => Promise<void>;
}