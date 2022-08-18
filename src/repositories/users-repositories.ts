interface IUserResponseData {
  id: string,
  name: string,
  email: string,
  artName: string | null,
  aboutMe: string | null,
  age: number,
  avatarImgPath: string | null,
}

export interface UsersRepository {
  registerUser: (name: string, email: string, password: string, age: number) => Promise<IUserResponseData>;
  findUserByEmail: (email: string) => Promise<IUserResponseData | null>;
}