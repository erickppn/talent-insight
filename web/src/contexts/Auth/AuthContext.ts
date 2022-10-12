import { createContext } from "react";
import { User, Profile } from "../../types/User";

type AuthContextType = {
  user: User | null,
  profile: Profile | null,
  isSigned: boolean,
  setUser: (user: User) => void,
  register: (name: string, email: string, password: string, confirmPassword: string, age: number) => Promise<void | string>,
  signin: (email: string, password: string) => Promise<void | string>,
  signout: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextType>(null!);