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
  changeUserPassword: (id: string, newPassword: string) => Promise<UserInfoResponse>;
  deleteUserById: (id: string) => Promise<void>;
  findUsersByCategories: (category: string[]) => Promise<any>;
  createUserFollowRelation: (followedById: string, followingId: string) => Promise<any>;
  getAllFollows: (userId: string) => Promise<any>;
  deleteUserFollowRelation: (followedById: string, followingId: string) => Promise<any>;
}