import { useContext } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { Moon, SunDim } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";
import { ThemeContext } from "../../contexts/Theme/ThemeContext";

import { Search } from "./Search";
import { Menu } from "./Menu";

import logo from "../../assets/logo-only-text.png";
import whiteLogo from "../../assets/logo-only-text-white.png";

export function Header() {
  const { isSigned } = useContext(AuthContext);
  const { openRegister, openLogin } = useContext(ModalContext);
  
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center w-full bg-white dark:bg-zinc-800 da px-6 py-4">
      <div className="flex-1 flex items-center gap-[72px]">
        <Link to="/">
          <img src={darkTheme ? whiteLogo : logo} alt="Logo da Talent Insight" className="w-48"/>
        </Link>

        <Search />
      </div>

      <div className="flex items-center gap-5">
        <Switch
          checked={darkTheme}
          onChange={setDarkTheme} 
          className={`${darkTheme ? 'bg-black' : 'bg-gray-200 text-blue-900'}
            relative inline-flex w-[50px] shrink-0 cursor-pointer rounded-md border-2 border-transparent`}
        >
          <span className="sr-only">Alterar tema</span>
          <span
            aria-hidden="true"
            className={`${darkTheme ? 'translate-x-6' : 'translate-x-0'}
              pointer-events-none inline-flex justify-center items-center h-[22px] w-[22px] transform rounded-md bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out`}
          >
            { darkTheme ? <Moon weight="fill" /> : <SunDim weight="fill" /> }
          </span>
        </Switch>

        { isSigned 
          ? <Menu /> 
          
          // Login Buttons
          : (
            <div className="flex gap-2">
              <button 
                className="py-1 px-3 rounded-md hover:bg-rose-400 active:bg-rose-300 border-[1px] border-red-500 hover:border-rose-300 dark:border-rose-500 text-rose-400 dark:text-rose-400 hover:text-white font-medium uppercase transition-colors"
                onClick={openLogin}
              >
                Entrar
              </button>

              <button 
                className=" py-1 px-3 rounded-md bg-rose-400 dark:bg-rose-500 hover:bg-transparent active:bg-red-400 border-[1px] border-red-300 dark:border-red-500 hover:border-red-500 text-white hover:text-rose-400 active:text-white font-medium uppercase transition-colors"
                onClick={openRegister}
              >
                Cadastrar-se
              </button>
            </div>
          )}
      </div>
    </header>
  )
}