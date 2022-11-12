import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import classNames from "classnames";

import { AuthContext } from "../../../contexts/Auth/AuthContext";

export function LoggedMenuOptions() {
  const { signout } = useContext(AuthContext);
  
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link 
            className={classNames("flex justify-between items-center w-full px-3 py-1 text-sm rounded-md transition-colors active:bg-zinc-100 dark:active:bg-zinc-900", 
              active && "bg-zinc-50 dark:bg-zinc-700"
            )}
            to="/@me"
          >
            Meu Perfil
          </Link>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <Link 
            className={classNames("flex justify-between items-center w-full px-3 py-1 text-sm rounded-md transition-colors active:bg-zinc-100 dark:active:bg-zinc-900", 
              active && "bg-zinc-50 dark:bg-zinc-700"
            )}
            to="/@me/configurations"
          >
            Configurações
          </Link>
        )}
      </Menu.Item>

      <hr className="border-t-[1px] w-[85%] m-auto border-red-400"/>

      <Menu.Item>
        {({ active }) => (
          <button 
            className={classNames("flex justify-center w-full px-1 py-1 text-sm rounded-md text-red-400 transition-colors active:bg-zinc-100 dark:active:bg-zinc-900", 
              active && "bg-zinc-50 dark:bg-zinc-700"
            )}
            onClick={signout}
          >
            Sair
          </button>
        )}
      </Menu.Item>
    </>
  )
}