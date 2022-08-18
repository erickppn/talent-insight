interface IUserResponseData {
  id: string,
  name: string,
  email: string,
  age: number
}

export interface UsersRepository {
  registerUser: (name: string, email: string, password: string, age: number) => Promise<IUserResponseData>;
  findUserByEmail: (email: string) => Promise<IUserResponseData | null>;
}