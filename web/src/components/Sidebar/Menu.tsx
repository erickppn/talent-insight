import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import classNames from "classnames";
import { House, ChartBar, Compass, ArrowLineLeft, List, IconContext, Gear, User, UserCircle } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";

interface MenuProps {
  sideBarStatus: boolean,
  toggleSideBarStatus: (sideBarStatus: boolean) => void;
}

const menuOptions = [
  {
    name: "Home",
    icon: <House size={26} />,
    to: "",
    loginRequired: false,
  },
  {
    name: "Descobrir",
    icon: <Compass size={26} />,
    to: "#",
    loginRequired: false,
  },
  {
    name: "Suas estatísticas",
    icon: <ChartBar size={26} />,
    to: "#",
    loginRequired: true,
  },
  {
    name: "Meu Perfil",
    icon: <UserCircle size={26} />,
    to: "@me",
    loginRequired: true,
  },
];

export function Menu(props: MenuProps) {
  const { sideBarStatus, toggleSideBarStatus } = props;
  
  const { isSigned } = useContext(AuthContext);

  const location = useLocation();
  const [currentPath] = location.pathname.split("/").splice(1);

  return (
    <header
      className={classNames("flex justify-between gap-2 mb-6 bg-white rounded-xl px-4 py-2 text-gray-500",
        sideBarStatus ? "flex-row" : "flex-col-reverse py-4"
      )}
    >
      <div className={classNames("flex-1 flex justify-between gap-2",
        sideBarStatus ? "flex-row" : "flex-col"
      )}>
        {menuOptions.map((option, i) => (
          <Link 
            key={option.name + i}
            to={option.to}
            className={classNames("flex justify-center items-center gap-2 min-w-[32px] min-h-[32px] h-8 rounded-md",
              currentPath === option.to ? " font-semibold bg-rose-500 text-white" : "hover:bg-gray-100",
              option.loginRequired && !isSigned && "hidden",
              !option.loginRequired && !isSigned ? "flex-1" : "w-8"
            )}
          >
            <span className="sr-only">
              {option.name}
            </span>

            <IconContext.Provider
              value={{ weight: currentPath === option.to ? "fill" : "regular" }}
            >
              {option.icon}
            </IconContext.Provider>
          </Link>
        ))}
      </div>

      <button
        className="flex items-center justify-center min-w-[32px] w-8 min-h-[32px] h-8 rounded-md hover:bg-gray-100 hover:text-whte transition-colors"
        onClick={() => toggleSideBarStatus(!sideBarStatus)}
      >
        {
          sideBarStatus ? (
            <ArrowLineLeft size={24} />
          ) : (
            <List size={26} />
          )
        }
      </button>
    </header>
  )
}