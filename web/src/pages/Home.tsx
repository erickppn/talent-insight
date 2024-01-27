import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

import { PostBox } from "../components/PostBox";

export function Home() {
  const { isSigned } = useContext(AuthContext);
  
  return (
    <div className="flex justify-between gap-6 py-6 pr-6">
      <div className="flex-1 flex m-auto max-w-2xl gap-6 flex-col">
        { isSigned && <PostBox /> }
        
        <div className="h-[500px] rounded-xl bg-white dark:text-zinc-100 borer-2 dark:bg-black" />
        <div className="h-[600px] rounded-xl bg-white dark:text-zinc-100 borer-2 dark:bg-black" />
        <div className="h-[500px] rounded-xl bg-white dark:text-zinc-100 borer-2 dark:bg-black" />
        <div className="h-[400px] rounded-xl bg-white dark:text-zinc-100 borer-2 dark:bg-black" />
        <div className="h-[900px] rounded-xl bg-white dark:text-zinc-100 borer-2 dark:bg-black" />
      </div>

      <div className="min-w-[19rem] flex justify-between flex-col h-full rounded-xl bg-white dark:text-zinc-100 borer-2 dark:bg-black" />
    </div>
  )
}