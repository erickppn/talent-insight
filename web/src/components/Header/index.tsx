import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ThemeContext } from "../../contexts/Theme/ThemeContext";

import { LoggedProfileOptions } from "./LoggedProfileOptions";
import { LoginOptions } from "./LoginOptions";
import { Menu } from "./Menu";

import logo from "../../assets/logo-only-text.png";
import whiteLogo from "../../assets/logo-only-text-white.png";

export function Header() {
  const { isSigned } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);

  return (
    <header className="flex dark:bg-zinc-800 dark:text-white justify-between items-center w-full h-12 px-6 py-2 border-b-[1px] border-b-red-200 dark:border-b-red-700">
      <Link to="/">
        <img src={darkTheme ? whiteLogo : logo} alt="Logo da Talent Insight" className="mt-1 w-48"/>
      </Link>

      <div className="flex items-center gap-3">
        { isSigned ? <LoggedProfileOptions /> : <LoginOptions /> }
        
        <Menu />
      </div>
    </header>
  )
}