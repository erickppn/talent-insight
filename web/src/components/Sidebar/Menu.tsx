import { useContext } from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import { House, Compass, ArrowLineLeft, List, UserCircle, GearSix } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";

interface MenuProps {
  sideBarStatus: boolean,
  toggleSideBarStatus: (sideBarStatus: boolean) => void;
}

export function Menu(props: MenuProps) {
  const { sideBarStatus, toggleSideBarStatus } = props;

  const { isSigned } = useContext(AuthContext);

  return (
    <header
      className={classNames("flex justify-between gap-2 mb-6 bg-white rounded-xl px-4 py-2 text-gray-500",
        sideBarStatus ? "flex-row" : "flex-col-reverse py-4"
      )}
    >
      <div className={classNames("flex-1 flex justify-between gap-2 overflow-x-hidden",
        sideBarStatus ? "flex-row" : "flex-col"
      )}>
        <NavLink
          to="/"
          className={({ isActive  }) => classNames(
            "flex flex-1 justify-center items-center gap-2 min-w-[32px] min-h-[32px] h-8 rounded-md",
            isActive ? " font-semibold bg-rose-500 text-white" : "hover:bg-gray-100", 
          )}
        >
          {({ isActive }) => (
            <>
              <span className="sr-only">Home</span>
              <House size={26} weight={isActive ? "fill" : "regular"} />
            </>
          )}
        </NavLink>

        <NavLink
          to="/discover" 
          className={({ isActive }) => classNames(
            "flex flex-1 justify-center items-center gap-2 min-w-[32px] min-h-[32px] h-8 rounded-md",
            isActive ? " font-semibold bg-rose-500 text-white" : "hover:bg-gray-100",
          )}
        >
          {({ isActive }) => (
            <>
              <span className="sr-only">Descobrir</span>
              <Compass size={26} weight={isActive ? "fill" : "regular"} />
            </>
          )}
        </NavLink>

        <NavLink
          to="/configurations"
          className={({ isActive }) => classNames(
            "flex flex-1 justify-center items-center gap-2 min-w-[32px] min-h-[32px] h-8 rounded-md",
            isActive ? " font-semibold bg-rose-500 text-white" : "hover:bg-gray-100",
          )}
        >
          {({ isActive }) => (
            <>
              <span className="sr-only">Meu Perfil</span>
              <GearSix size={26} weight={isActive ? "fill" : "regular"} />
            </>
          )}
        </NavLink>

        {isSigned && (
          <NavLink
            to="/users/@me"
            className={({ isActive }) => classNames(
              "flex flex-1 justify-center items-center gap-2 min-w-[32px] min-h-[32px] h-8 rounded-md",
              isActive ? " font-semibold bg-rose-500 text-white" : "hover:bg-gray-100",
            )}
          >
            {({ isActive }) => (
              <>
                <span className="sr-only">Home</span>
                <UserCircle size={26} weight={isActive ? "fill" : "regular"} />
              </>
            )}
          </NavLink>
        )}
      </div>

      <button
        className="flex items-center justify-center min-w-[32px] w-8 min-h-[32px] h-8 rounded-md hover:bg-gray-100 hover:text-whte transition-colors"
        onClick={() => toggleSideBarStatus(!sideBarStatus)}
      >
        {sideBarStatus 
          ? <ArrowLineLeft size={24} />
          : <List size={26} />
        }
      </button>
    </header>
  )
}