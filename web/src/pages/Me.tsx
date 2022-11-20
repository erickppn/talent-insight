import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/Auth/AuthContext";

import defaultAvatar from "../assets/default-avatar.png";

export function Me() {
  const { user, profile } = useContext(AuthContext);

  return (
    <main className="flex justify-center p-3 dark:text-zinc-400">
    

    </main>
  )
}