import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import { PencilSimple, UserGear, Warning } from "phosphor-react";

const menuOptions = [
  {
    name: "Editar perfil",
    color: "text-zinc-700",
    icon: <PencilSimple size={20} weight="regular"/>,
    to: "profile"
  },
  {
    name: "Configurações da conta",
    color: "text-zinc-700",
    icon: <UserGear size={20} weight="regular"/> ,
    to: "account"
  },
  {
    name: "Danger área",
    color: "text-rose-500",
    icon: <Warning size={20} weight="regular"/>,
    to: "danger"
  },
];

export function Configurations() {
  const location = useLocation();

  const [currentPath] = location.pathname.split("/").slice(-1);

  return (
    <div className="flex flex-1">
      <nav className="flex flex-col w-72 p-6 px-3 border-r-2">
        <h1 className="w-full text-lg font-medium mb-6">
          Configurações
        </h1>

        <ul className="flex flex-col gap-[2px]">
          {menuOptions.map(option => (
            <li key={option.name}>
              <Link 
                to={option.to}
                className={ classNames("flex items-center gap-2 w-full rounded-xl p-3 text-sm hover:bg-slate-50 transition-colors", 
                  option.color,
                  currentPath === option.to && "text-zinc-900 bg-slate-50",
              )}>
                {option.icon} {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}