import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tag } from "react-tag-input";
import { MagnifyingGlass } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ThemeContext } from "../../contexts/Theme/ThemeContext";

import { Menu } from "./Menu";
import { SelectCategories } from "../SelectCategories";
import { LoggedProfileOptions } from "./LoggedProfileOptions";
import { LoginOptions } from "./LoginOptions";

import logo from "../../assets/logo-only-text.png";
import whiteLogo from "../../assets/logo-only-text-white.png";


const ReactTagsClassNames =  {
  tagInput: "w-full h-full relative",
  tagInputField: "w-full bg-transparent focus:ring-0 focus:outline-none",
  selected: "flex gap-1 [&>*]:flex [&>*]:gap-2 [&>span>*]:font-bold [&>span]:text-white",
  tag: "flex items-center px-2 bg-rose-300 rounded-md",
  suggestions: "flex min-w-[210px] absolute p-2 bg-white rounded-md mt-9 z-10 [&>ul]:w-full [&>ul>*]:py-2 [&>ul>*]:w-full [&>ul>*]:px-2 [&>ul>*]:rounded-md cursor-pointer before:w-4 before:h-4 before:bg-white dark:before:bg-zinc-800 before:transition-colors before:absolute before:rounded-sm before:rotate-45 before:-top-1 before:left-2",
  activeSuggestion: "bg-zinc-50"
};

export function Header() {
  const [categories, setCategories] = useState<Tag[]>([]);

  const { isSigned } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (categories.length < 1) {
      return navigate("/");
    }

    const formatedTags = categories.map(tag => {
      return tag.text;
    });

    const categoriesUrl = formatedTags.join(";");

    navigate(`search=${categoriesUrl}`);
  }

  return (
    <header className="flex dark:bg-zinc-800 dark:text-white justify-between items-center w-full h-12 px-6 border-b border-b-red-200 dark:border-b-red-700">
      <Link to="/">
        <img src={darkTheme ? whiteLogo : logo} alt="Logo da Talent Insight" className="w-48"/>
      </Link>

      <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-2xl 2xl:max-w-4xl w-full h-full">
        <div className="flex-1">
          <SelectCategories 
            categories={categories} 
            setCategories={setCategories}
            inputFieldPosition="inline"
            reactTagsClassNames={ReactTagsClassNames}
          />
        </div>

        <button className="p-2 bg-transparent rounded-md hover:bg-zinc-200 transition-colors" type="submit">
          <MagnifyingGlass size={20} />
        </button>
      </form>

      <div className="flex items-center gap-3 my-2">
        { isSigned ? <LoggedProfileOptions /> : <LoginOptions /> }
        
        <Menu />
      </div>
    </header>
  )
}