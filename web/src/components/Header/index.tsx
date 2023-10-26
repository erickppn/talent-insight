import { useContext } from "react";
import { Link } from "react-router-dom";
import * as Switch from '@radix-ui/react-switch';
import * as Dialog from "@radix-ui/react-dialog";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";
import { ThemeContext } from "../../contexts/Theme/ThemeContext";

import { Search } from "./Search";
import { Menu } from "./Menu";
import { SignInUser } from "../Modal/SignIn";
import { RegisterUser } from "../Modal/Register";

import logo from "../../assets/logo-only-text.png";
import whiteLogo from "../../assets/logo-only-text-white.png";

export function Header() {
  const { isSigned } = useContext(AuthContext);
  const { isOpenLoginModal, toggleLoginModal, isOpenRegisterModal, toggleRegisterModal } = useContext(ModalContext);

  const { darkTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center w-full bg-white dark:bg-zinc-800 da px-6 py-4">
      <Link to="/">
        <img src={darkTheme ? whiteLogo : logo} alt="Logo da Talent Insight" className="w-48 min-w-[12rem]"/>
      </Link>

      <Search />

        { isSigned 
          ? <Menu /> 
          
          // Login Buttons
          : (
            <div className="flex gap-2">
              <Dialog.Root open={isOpenLoginModal} onOpenChange={toggleLoginModal}>
                <Dialog.Trigger asChild>
                  <button 
                    className="py-1 px-3 rounded-md hover:bg-rose-400 active:bg-rose-300 border-[1px] border-red-500 hover:border-rose-300 dark:border-rose-500 text-rose-400 dark:text-rose-400 hover:text-white font-medium uppercase transition-colors"
                  >
                    Entrar
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black bg-opacity-10" />

                  <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Dialog.Content className="data-[state=open]:animate-modal-show dark:bg-zinc-800 bg-[rgb(253,253,253)] rounded-lg shadow-lg">
                      <SignInUser />
                    </Dialog.Content>
                  </div>
                </Dialog.Portal>
              </Dialog.Root>

              <Dialog.Root open={isOpenRegisterModal} onOpenChange={toggleRegisterModal}>
                <Dialog.Trigger asChild>
                  <button 
                    className=" py-1 px-3 rounded-md bg-rose-400 dark:bg-rose-500 hover:bg-transparent active:bg-red-400 border-[1px] border-red-300 dark:border-red-500 hover:border-red-500 text-white hover:text-rose-400 active:text-white font-medium uppercase transition-colors"
                  >
                    Cadastrar-se
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10 data-[state=open]:animate-overlayShow" />

                  <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Dialog.Content className="data-[state=open]:animate-modal-show dark:bg-zinc-800 bg-[rgb(253,253,253)] rounded-lg shadow-lg">
                      <RegisterUser />
                    </Dialog.Content>
                  </div>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          )}
    </header>
  )
}