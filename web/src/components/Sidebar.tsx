import { useEffect, useState } from "react";
import classNames from "classnames";

import { ArrowLineLeft } from "phosphor-react";

export function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(JSON.parse(localStorage.getItem("tl-sidebar") || "true"));

  useEffect(() => {
    localStorage.setItem("tl-sidebar", JSON.stringify(isSidebarActive));
  }, [isSidebarActive]);
  
  return (
    <aside className={classNames("flex flex-col justify-between border-r-2 dark:border-r-zinc-400 transition-all ease-out duration-500 overflow-hidden", isSidebarActive ? "w-56" : "w-12")}>
      <header className="flex items-center p-2 border-b-2 dark:border-b-zinc-400 relative h-11">
        <span className={classNames("transition-opacity whitespace-nowrap delay-300 dark:text-zinc-300", isSidebarActive ? "opacity-100": "opacity-0")}>
          Top Perfis da Semana
        </span>

        <button 
          className={classNames("w-7 h-7 rounded-lg absolute right-2 hover:bg-zinc-200 active:bg-zinc-300 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-800 transition-colors", {"right-2": !isSidebarActive })}
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          <ArrowLineLeft size={18} className={classNames("m-auto transition-transform ease-out duration-500", isSidebarActive ? "" : "rotate-180" )}/>
        </button>
      </header>

      <div className="Aside flex-1 p-2">
        <span className={classNames("transition-opacity dark:text-zinc-300", isSidebarActive ? "opacity-100": "opacity-0")}>
          Perfis
        </span>
      </div>
    </aside>
  )
}