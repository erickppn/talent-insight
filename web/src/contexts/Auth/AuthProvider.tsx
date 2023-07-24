import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User, PublicUserInfo } from "../../types/User";
import { Profile } from "../../types/Profile";

import { useApi } from "../../hooks/useApi";

export function AuthProvider({ children }: { children: JSX.Element }){
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("saved-user") || "null"));
  const [profile, setProfile] = useState<Profile | null>(JSON.parse(localStorage.getItem("saved-profile") || "null"));
  const [following, setFollowing] = useState<PublicUserInfo[]>([]);

  const api = useApi();

  async function register(name: string, email: string, password: string, confirmPassword: string, birthDate: Date) {
    const data = await api.registerUser(name, email, password, confirmPassword, birthDate);

    if (data.error) {
      return data.message;
    }

    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
    }
  }

  async function signin(email: string, password: string) {
    const data = await api.signinUser(email, password);

    if (data.error) {
      return data.message;
    }

    if (data.user && data.token) {
      setUser(data.user);
      setProfile(data.userProfile);
      setFollowing(data.follows);
      setToken(data.token);
    }
  }

  async function signout() {
    setUser(null);
    setProfile(null);
    setFollowing([]);
    setToken('');
  }

  function setToken(token: string) {
    localStorage.setItem('ti-auth-token', token);
  }

  useEffect(() => {
    localStorage.setItem("saved-user", JSON.stringify(user) || "null");
    localStorage.setItem("saved-profile", JSON.stringify(profile) || "null");
  }, [user]);

  useEffect(() => {
    async function validateToken() {
      const storageData = localStorage.getItem("ti-auth-token");

      if (storageData) {
        try {
          const data = await api.validateUserToken(storageData);

          if (data.user) {
            setUser(data.user);
            setProfile(data.userProfile);
            setFollowing(data.follows);
          } else {
            await signout();
          }

        } catch (e) {
          setUser(null);
          setProfile(null);
          setFollowing([]);
          console.log(e);
        }
      }
    }

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isSigned: !!user,
      profile,
      following,
      setUser,
      setProfile,
      setFollowing,
      register,
      signin,
      signout
    }}>
      {children}
    </AuthContext.Provider>
  )
}