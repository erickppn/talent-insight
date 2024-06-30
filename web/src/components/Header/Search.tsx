import { useState, FormEvent } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Tag, WithContext as ReactTags } from "react-tag-input";

import { MagnifyingGlass } from "phosphor-react";

const KeyCodes = {
  TAB: 9,
  ENTER: 13,
  COMMA: 188,
};

const ReactTagsClassNames =  {
  tagInput: "w-full h-full text-gray-600 dark:text-gray-200",
  tagInputField: "w-full bg-transparent focus:ring-0 focus:outline-none",
  selected: "flex gap-1 [&>*]:flex [&>*]:gap-2 [&>span>*]:font-bold [&>span]:text-gray-700",
  tag: "flex justify-between items-center w-fit px-2 bg-gray-300 rounded-md whitespace-nowrap font-medium",
  suggestions: "flex min-w-[210px] absolute p-2 bg-white rounded-md mt-14 z-20 shadow-lg [&>ul]:w-full [&>ul>*]:py-2 [&>ul>*]:w-full [&>ul>*]:px-2 [&>ul>*]:rounded-md cursor-pointer before:w-4 before:h-4 before:bg-white dark:before:bg-zinc-800 before:transition-colors before:absolute before:rounded-sm before:rotate-45 before:-top-1 before:left-2",
  activeSuggestion: "bg-zinc-50"
};

export function Search() {
  const [categories, setCategories] = useState<Tag[]>([]);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (categories.length < 1) {
      return navigate("/explore");
    }

    const params = createSearchParams();

    categories.map(tag => {
      params.append('tag', tag.text);
    });

    navigate({
      pathname: 'explore/search',
      search: `${createSearchParams(params)}`
    });
  }

  function handleDelete(i: number) {
    setCategories(categories.filter((tag, index) => index !== i));
  };

  function handleAddition(tag: Tag) {
    const formatedText = tag.text.toLocaleUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "");

    const text = { id: tag.id, text: formatedText };
    setCategories([...categories, text]);
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mx-auto max-w-2xl 2xl:max-w-4xl w-full pl-5 bg-gray-100 dark:bg-black rounded-lg">
      <div className="flex-1 overflow-x-auto scrollbar-none">
        <ReactTags
          tags={categories}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          delimiters={[
            KeyCodes.TAB,
            KeyCodes.ENTER,
            KeyCodes.COMMA
          ]}
          
          classNames={ReactTagsClassNames}
          inputFieldPosition="inline"
          placeholder={categories.length === 0 ? "Música, desenho, artísta..." : ""} 
          allowDragDrop={false}
        />
      </div>

      <button className="px-3 py-2 rounded-r-md bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:text-white transition-colors" type="submit">
        <MagnifyingGlass size={20} weight="bold" />
      </button>
    </form>
  )
}