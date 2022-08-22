type UserInfoResponse = {
  id: string,
  name: string,
  email: string,
  age: number,
  password?: string,
}

type UsersAlredyExistsResponse = {
  name: string,
  email: string
}

export interface UsersRepository {
  registerUser: (name: string, email: string, password: string, age: number) => Promise<UserInfoResponse>;
  findUsersByNameOrEmail: (name: string, email: string) => Promise<UsersAlredyExistsResponse[]>;
  findUserByEmail: (email: string) => Promise<UserInfoResponse | null>;
  findUserById: (id: string) => Promise<UserInfoResponse | null>;
  deleteUserById: (id: string) => Promise<void>;
}