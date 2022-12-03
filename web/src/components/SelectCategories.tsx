import { Tag, WithContext as ReactTags } from "react-tag-input";

const KeyCodes = [
  {code: 188},
  {code: 13},
  {code: 9},
  {code: 32}
];

const delimiters = KeyCodes.map(keycode => { return keycode.code });

export function SelectCategories({ categories, setCategories, inputFieldPosition, reactTagsClassNames }: { categories: Tag[], setCategories: (categories: Tag[]) => void, inputFieldPosition: "bottom" | "top" | "inline", reactTagsClassNames: any }) {
  function handleDelete(i: number) {
    setCategories(categories.filter((tag, index) => index !== i));
  };

  function handleAddition(tag: Tag) {
    const formatedText = tag.text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "");

    const text = { id: tag.id, text: formatedText };
    setCategories([...categories, text]);
  };

  function handleDrag(tag: Tag, currPos: number, newPos: number) {
    const newCategoriesUrl = categories.slice();

    newCategoriesUrl.splice(currPos, 1);
    newCategoriesUrl.splice(newPos, 0, tag);

    setCategories(newCategoriesUrl);
  };

  return (
    <ReactTags
      classNames={reactTagsClassNames}
      tags={categories}
      suggestions={[ { id: "Test", text: "Test" } ]}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition={inputFieldPosition}
      autocomplete
      autofocus={false}
      placeholder={categories.length === 0 ? "Música, desenho, artísta etc." : ""}
    />
  )
}