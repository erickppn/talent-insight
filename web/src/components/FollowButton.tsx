import { useContext, useEffect, useState } from "react";
import { UserPlus } from "phosphor-react";

import { AuthContext } from "../contexts/Auth/AuthContext";
import { ModalContext } from "../contexts/Modal/ModalContext";
import { useApi } from "../hooks/useApi";

export function FollowButton({ userToFollow }: { userToFollow: string | undefined }) {
  const { user, following, setFollowing } = useContext(AuthContext);
  const { openLogin } = useContext(ModalContext);

  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const api = useApi();

  async function handleFollowUser() {
    if (!user) {
      return openLogin();
    }

    const response = await api.followUser(userToFollow);

    if (response.error) {
      return console.log(response.message);
    }
    
    setFollowing([...following, response]);
  }

  async function handleUnfollowUser() {
    const response = await api.unfollowUser(userToFollow);

    if (response.error) {
      return console.log(response.message);
    }

    setFollowing(following.filter(follow => follow.id !== userToFollow));
  }

  useEffect(() => {
    const checkFollowings = following.findIndex(following => following.id === userToFollow);

    setIsFollowingUser(checkFollowings > -1 ? true : false);
  }, [following]);
  
  return (
    <button 
      onClick={isFollowingUser ? handleUnfollowUser : handleFollowUser}
      className="px-5 py-3 text-sm text-white bg-rose-400 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-rose-300 transition-colors"
    >
      <UserPlus size={24} /> { isFollowingUser ? "Seguindo" : "Seguir Usuário" }
    </button>
  )
}