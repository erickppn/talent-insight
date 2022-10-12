import { PaperPlaneRight } from "phosphor-react";
import { Link } from "react-router-dom";

import profilePic from "../../assets/floppa.png";

export function LoggedProfileOptions() {
  return (
    <>
      <Link 
        className="group flex items-center justify-between gap-1 text-emerald-500 border-[1px] border-emerald-500 py-1 pl-3 pr-[10px] rounded-md transition-colors hover:text-white hover:bg-emerald-500 active:bg-emerald-600 active:border-emerald-600 dark:active:bg-zinc-900 dark:bg-zinc-800"
        to="/@me/send"
      >
        Publicar
        <PaperPlaneRight size={18} className="group-hover:animate-x-bounce transition-transform duration-1000" />
      </Link>

      <Link to="/@me" className="h-8 w-8 rounded-md overflow-hidden">
        <img src="https://cf.shopee.com.br/file/e25dcba6ab6160c16da99bdd7c12a728" alt="Minha foto de perfil" />
      </Link>
    </>
  )
}