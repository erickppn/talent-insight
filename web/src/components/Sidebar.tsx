import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLineLeft, House, List, PlugsConnected, SignIn, Sparkle, Users } from "phosphor-react";
import classNames from "classnames";

import { AuthContext } from "../contexts/Auth/AuthContext";
import { ModalContext } from "../contexts/Modal/ModalContext";

import defaultAvatar from "../assets/default-avatar.png";

export function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(JSON.parse(localStorage.getItem("tl-sidebar") || "true"));

  const { user, following } = useContext(AuthContext);
  const { openLogin } = useContext(ModalContext);

  useEffect(() => {
    localStorage.setItem("tl-sidebar", JSON.stringify(isSidebarActive));
  }, [isSidebarActive]);
  
  return (
    <aside className={classNames("flex flex-col justify-between transition-all ease-out duration-500 overflow-x-hidden overflow-y-auto scrollbar-none", isSidebarActive ? "w-56" : "w-12")}>
      <header className={classNames("flex items-center justify-between gap-2 py-2", isSidebarActive ? "flex-row ml-3" : "flex-col-reverse")}>
        <Link 
          to="/"
          className="flex flex-1 items-center gap-2 overflow-hidden whitespace-nowrap p-2 pt-1 rounded-lg hover:bg-slate-300 transition-colors duration-300"
        >
          <House size={20} />

          <span className={isSidebarActive ? "block" : "hidden"}>
            Home
          </span>
        </Link>

        <button 
          className={classNames("w-9 h-9 rounded-lg right-[10px] hover:bg-zinc-200 active:bg-zinc-300 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-800 transition-colors", isSidebarActive && "right-0")}
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          {
            isSidebarActive ? (
              <ArrowLineLeft size={18} className="m-auto"/>
            ) : (
              <List size={20} className="m-auto"/>
            )
          }
        </button>
      </header>

      <main className="flex-1">
        <section className={classNames("flex flex-col transition-all", isSidebarActive && "px-3")}>
          <div className={classNames("flex items-center gap-2 mb-1", isSidebarActive ? "ml-2" : "ml-3")}>
            <Sparkle className="text-orange-400" weight="fill" size={24} />

            <span className={classNames("whitespace-nowrap dark:text-zinc-300", isSidebarActive ? "opacity-100": "opacity-0 hidden")}>
              Perfis para conhecer
            </span>
          </div>
        </section>

        <hr className="bg-zinc-300 my-3 p-[.5px]"/>

        <section className={classNames("flex flex-col transition-all", isSidebarActive && "px-3")}>
          {user && following.length ? (
            <>
              <div className={classNames("flex items-center gap-2 mb-1", isSidebarActive ? "ml-2" : "ml-[11px]")}>
                <Users weight="light" size={24} />

                <span className={classNames("whitespace-nowrap dark:text-zinc-300", isSidebarActive ? "opacity-100": "opacity-0 hidden")}>
                  Seguindo
                </span>
              </div>

              {following.map(follow => (
                <Link 
                  key={follow.id}
                  to={`/user/${follow.id}`}
                  className="flex items-center gap-4 max-h-20 overflow-hidden whitespace-nowrap p-2 pt-1 rounded-lg hover:bg-slate-300 transition-colors duration-300 animate-f-bounce"
                >
                  <img 
                    className="h-8 w-8 mt-1 rounded-full object-cover"
                    src={follow.profile.avatarUrl || defaultAvatar}
                  />

                  <span className="flex flex-col">
                    {follow.profile.artName || follow.name}
                  </span>
                </Link>
              ))}
            </>
          ) : (
            <div className="flex justify-center">
              { user ? (
                <div 
                  className="flex flex-col items-center gap-1"
                >
                  <PlugsConnected size={26} />

                  <p className={classNames("text-sm text-center whitespace-nowrap", isSidebarActive ? "block": "hidden")}>
                    Comece a seguir outros <br /> usuários!
                  </p>
                </div>
              ) : (
                <button 
                  onClick={openLogin}
                  className="flex flex-col items-center gap-1 animate-pulse"
                >
                  <SignIn size={26} />

                  <p className={classNames("text-sm text-center whitespace-nowrap", isSidebarActive ? "block": "hidden")}>
                    Entre para começar a seguir <br /> outros usuários!
                  </p>
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </aside>
  )
}