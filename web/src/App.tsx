import { useContext } from "react";
import classNames from "classnames";

import { ThemeContext } from "./contexts/Theme/ThemeContext";
import { ModalContext } from "./contexts/Modal/ModalContext";

import { Header } from "./components/Header";
import { Router } from "./router";
import { Sidebar } from "./components/Sidebar";

export function App() {
  const { darkTheme } = useContext(ThemeContext);
  const { isAnyOpenModal } = useContext(ModalContext);
  
  return (
    <div  className={classNames("flex flex-col h-screen", { "dark": darkTheme, "blur-[1px]": isAnyOpenModal } )}>
      <Header />

      <div className="flex flex-1 overflow-auto dark:bg-zinc-900">
        <Sidebar />

        <div className="flex flex-col flex-1 justify-between overflow-auto scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin">
          <Router />

          <footer className="flex dark:bg-zinc-800 dark:text-white justify-between items-center w-full h-12 px-6 py-2 border-t-[1px] border-t-red-200 dark:border-t-red-700">
            Footer
          </footer>
        </div>
      </div>
    </div>
  )
}
