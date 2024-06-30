import { useContext } from "react";
import classNames from "classnames";

import { ThemeContext } from "./contexts/Theme/ThemeContext";
import { ModalContext } from "./contexts/Modal/ModalContext";
import { SidebarProvider } from "./contexts/Sidebar/SidebarProvider";

import { Header } from "./components/Header";
import { Router } from "./router";
import { Sidebar } from "./components/Sidebar";

export function App() {
  const { darkTheme } = useContext(ThemeContext);
  const { isAnyOpenModal } = useContext(ModalContext);

  return (
    <div className={classNames("flex flex-col h-screen", { "dark": darkTheme, "blur-[1px]": isAnyOpenModal })}>
      <Header />
      
      <SidebarProvider>
        <div className="flex flex-1 overflow-auto dark:bg-zinc-900">
          <Sidebar />

          <main id="main" className="flex flex-col flex-1 justify-between overflow-auto scrollbar-thumb-red-400 hover:scrollbar-thumb-red-300 active:scrollbar-thumb-red-500 scrollbar-track-transparent scrollbar-thin">
            <Router />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
