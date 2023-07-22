import { useContext } from "react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { AuthContext } from "../../contexts/Auth/AuthContext";

import { CaretDown, GearSix, SignOut, UserCircle } from "phosphor-react";

import defaultAvatar from "../../assets/default-avatar.png";

export function Menu() {
  const { user, profile } = useContext(AuthContext);

  const { signout } = useContext(AuthContext);

  const userFirstName = user?.name.split(" ")[0];
  const profileFirstName = profile?.artName && profile.artName.split(" ")[0];

  const profilePic = profile?.avatarUrl;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex items-center overflow-hidden cursor-pointer">
          <div className="h-8 w-8 rounded-md overflow-hidden mr-3">
            <img src={profilePic ? profilePic : defaultAvatar} alt="Minha foto de perfil" className="h-8 w-8 object-cover" />
          </div>

          <span className="text-sky-900 dark:text-white text-[15px] font-medium truncate mr-4">
            {profile?.artName ? profileFirstName : userFirstName}
          </span>

          <CaretDown size={18} weight="bold" className="text-sky-900 dark:text-white" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={24}
          className="min-w-[180px] mr-6 p-1 rounded-md bg-white dark:bg-zinc-800 shadow-xl"
        >
          <DropdownMenu.Item>
            <Link
              className="flex justify-between items-center gap-2 w-full px-3 py-2 rounded-md transition-colors text-sm text-gray-600 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 active:bg-zinc-100 dark:active:bg-zinc-900"
              to="/@me"
            >
              Perfil <UserCircle size={20} /> 
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <Link
              className="flex justify-between items-center gap-2 w-full px-3 py-2 rounded-md transition-colors text-sm text-gray-600 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 active:bg-zinc-100 dark:active:bg-zinc-900"
              to="configurations/profile"
            >
              Configurações <GearSix size={20} /> 
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="border-t-[1px] w-full m-auto my-1 border-gray-200" />

          <DropdownMenu.Item>
            <button
              className="flex justify-center items-center gap-2 w-full py-[6px] text-sm rounded-md text-red-500 font-semibold transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 active:bg-zinc-100 dark:active:bg-zinc-900"
              onClick={signout}
            >
              <SignOut size={18} /> Sair
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow height={8} width={16} className="fill-white " />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}