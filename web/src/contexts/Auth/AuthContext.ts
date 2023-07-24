import { createContext } from "react";
import { User, PublicUserInfo } from "../../types/User";
import { Profile } from "../../types/Profile";

type AuthContextType = {
  user: User | null,
  profile: Profile | null,
  following: PublicUserInfo[],
  isSigned: boolean,
  setUser: (user: User) => void,
  setProfile: (profile: Profile) => void,
  register: (name: string, email: string, password: string, confirmPassword: string, birthDate: Date) => Promise<void | string>,
  setFollowing: (follows: PublicUserInfo[]) => void,
  signin: (email: string, password: string) => Promise<void | string>,
  signout: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextType>(null!);