import { Tag, WithContext as ReactTags } from "react-tag-input";
import { Hash } from "phosphor-react";

const KeyCodes = {
  TAB: 9,
  ENTER: 13,
  COMMA: 188,
};

const ReactTagsClassNames = {
  selected: "flex flex-wrap gap-1",
  tag: "flex items-center gap-2 px-2 py-1 w-fit bg-rose-500 rounded-md text-sm text-white whitespace-nowrap font-medium",
  tagInput: "text-gray-600 dark:text-gray-200",
  tagInputField: "w-full bg-transparent focus:ring-0 focus:outline-none",

  suggestions: "flex min-w-[210px] absolute p-2 bg-white rounded-md mt-9 z-10 [&>ul]:w-full [&>ul>*]:py-2 [&>ul>*]:w-full [&>ul>*]:px-2 [&>ul>*]:rounded-md cursor-pointer before:w-4 before:h-4 before:bg-white dark:before:bg-zinc-800 before:transition-colors before:absolute before:rounded-sm before:rotate-45 before:-top-1 before:left-2",
  activeSuggestion: "bg-zinc-50"
};

interface TagsInputProps {
  categories: Tag[];
  handleChangeCategories: (categories: Tag[]) => void;
}

export function TagsInput({ categories, handleChangeCategories } : TagsInputProps) {
  function handleDelete(i: number) {
    handleChangeCategories(categories.filter((tag, index) => index !== i));
  };

  function handleAddition(tag: Tag) {
    const formatedText = tag.text.toLocaleUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "");

    const text = { id: tag.id, text: formatedText };
    handleChangeCategories([...categories, text]);
  };

  return (
    <div className="flex gap-3 items-start mt-3">
      <span className="flex items-center mt-[10px] text-sm font-semibold gap-1 text-zinc-600">
        <Hash size={18} weight="bold" />
        Categorias:
      </span>

      <div className="w-full p-2 border-b border-rose-500">
        <ReactTags 
          tags={categories}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          delimiters={[
            KeyCodes.TAB,
            KeyCodes.ENTER,
            KeyCodes.COMMA
          ]}
          inline

          classNames={ReactTagsClassNames}
          inputFieldPosition="inline"
          placeholder={categories.length === 0 ? "Música, desenho, artísta..." : ""}
          allowDragDrop={false} 
          autofocus={false}
        />
      </div>
    </div>
  )
}