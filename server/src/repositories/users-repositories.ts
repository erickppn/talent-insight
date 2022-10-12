type UserInfoResponse = {
  id: string,
  name: string,
  email: string,
  age: number,
  password?: string,
}

type UsersAlredyExistsResponse = {
  id: string,
  name: string,
  email: string
}

export interface UsersRepository {
  registerUser: (name: string, email: string, password: string, age: number) => Promise<UserInfoResponse>;
  findUsersByNameAndEmail: (name: string, email: string) => Promise<UsersAlredyExistsResponse[]>;
  findUserByEmail: (email: string) => Promise<UserInfoResponse | null>;
  findUserById: (id: string) => Promise<UserInfoResponse | null>;
  editUser: (id: string, name: string, email: string, password: string, age: number) => Promise<UserInfoResponse>;
  deleteUserById: (id: string) => Promise<void>;
}