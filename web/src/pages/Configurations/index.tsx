import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import { BellRinging, GearSix, Key, Link, Trash, UserCircleGear, UserSquare } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";

export function Configurations() {
  const { isSigned } = useContext(AuthContext);

  return (
    <main className="flex gap-6 flex-1 h-full py-6">
      <nav className="w-56 px-4 py-6 rounded-xl bg-white">
        <h1 className="mb-4 font-bold uppercase text-blue-900">
          Configurações
        </h1>

        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/configurations"
              end
              className={({ isActive }) => classNames(
                "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-blue-900",
                isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
              )}>
              <GearSix size={20} />
              Geral
            </NavLink>
          </li>

          {isSigned && (
            <>
              <li>
                <NavLink
                  to="/configurations/profile"
                  className={({ isActive }) => classNames(
                    "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-blue-900",
                    isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
                  )}>
                  <UserSquare size={20} />
                  Perfil
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/configurations/account"
                  end
                  className={({ isActive }) => classNames(
                    "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-blue-900",
                    isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
                  )}>
                  <UserCircleGear size={20} />
                  Minha conta
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/configurations/password"
                  end
                  className={({ isActive }) => classNames(
                    "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-blue-900",
                    isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
                  )}>
                  <Key size={20} />
                  Senha
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/configurations/notifications"
                  end
                  className={({ isActive }) => classNames(
                    "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-blue-900",
                    isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
                  )}>
                  <BellRinging size={20} />
                  Notificações
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/configurations/connections"
                  className={({ isActive }) => classNames(
                    "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-blue-900",
                    isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
                  )}>
                  <Link size={20} />
                  Conexões
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/configurations/delete"
                  end
                  className={({ isActive }) => classNames(
                    "flex items-center gap-2 px-3 py-1 rounded-md font-semibold text-red-700",
                    isActive ? " bg-rose-500 text-white" : "hover:bg-gray-100",
                  )}>
                  <Trash size={20} />
                  Deletar conta
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="flex-1 overflow-auto scrollbar-thumb-red-200 hover:scrollbar-thumb-red-300 active:scrollbar-thumb-red-500 scrollbar-track-transparent scrollbar-thin">
        <Outlet />
      </div>
    </main>
  )
}