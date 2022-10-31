import { Fragment, useContext } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { GearSix, SunDim, Moon } from "phosphor-react";
import classNames from "classnames";

import { ThemeContext } from "../../../contexts/Theme/ThemeContext";
import { AuthContext } from "../../../contexts/Auth/AuthContext";

import { LoggedMenuOptions } from "./LoggedMenuOptions";

import avatar from "../../../assets/floppa.png";

export function Menu() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { isSigned, user, profile } = useContext(AuthContext);

  const userFirstName = user?.name.split(" ")[0];
  const profileFirstName = profile?.artName && profile.artName.split(" ")[0];

  const profilePic = profile?.avatarUrl;

  return (
    <HeadlessMenu as="div" className="relative">
      <HeadlessMenu.Button className="group flex items-center hover:bg-zinc-200 dark:bg-zinc-900 p-[2px] rounded-md active:bg-zinc-300 transition-colors">
        <GearSix size={28} className={classNames("text-red-600 dark:text-white transition-transform ease-in-out duration-500 group-hover:rotate-180")} />
      </HeadlessMenu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items className="absolute right-0 mt-5 w-40 rounded-md bg-white dark:bg-zinc-800 before:w-4 before:h-4 before:bg-white dark:before:bg-zinc-800 before:transition-colors before:absolute before:rounded-sm before:rotate-45 before:-top-1 before:right-2">
          { user && 
            <div className="flex items-center mx-[14px] mt-3 mb-2 font-semibold">
              <div className="h-6 w-6 rounded-md overflow-hidden mr-2">
                <img src={profilePic ? profilePic : avatar} alt="Minha foto de perfil" className="h-6 w-6 object-cover" />
              </div>

              { profile?.artName ? profileFirstName : userFirstName }
            </div>
          }

          <div className="flex flex-col gap-1 p-1 text-black dark:text-zinc-300">
            <HeadlessMenu.Item>
              {({ active }) => (
                <button 
                  className={classNames("flex justify-between items-center w-full px-3 py-1 text-sm rounded-md active:bg-zinc-100 dark:active:bg-zinc-900 transition-colors", 
                    active && "bg-zinc-50 dark:bg-zinc-700"
                  )}
                  onClick={() => setDarkTheme(!darkTheme)}
                >
                  Tema
                  { darkTheme ? <Moon size={22} /> : <SunDim size={22} /> }
                </button>
              )}
            </HeadlessMenu.Item>

            {
              isSigned && <LoggedMenuOptions />
            }
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  )
}