import { Tag, WithContext as ReactTags, ReactTagsProps } from "react-tag-input";

const KeyCodes = {
  TAB: 9,
  ENTER: 13,
  COMMA: 188,
};

type SelectCategoriesProps = Omit<ReactTagsProps, 'handleAddition' | 'handleDelete'> & {
  tags: Tag[]; 
  setTags: (categories: Tag[]) => void; 
  reactTagsClassNames: any;
}

export function SelectCategories({tags, setTags, reactTagsClassNames, ...rest}: SelectCategoriesProps) {
  function handleDelete(i: number) {
    setTags(tags.filter((tag, index) => index !== i));
  };

  function handleAddition(tag: Tag) {
    const formatedText = tag.text.toLocaleUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "");

    const text = { id: tag.id, text: formatedText };
    setTags([...tags, text]);
  };

  function handleDrag(tag: Tag, currPos: number, newPos: number) {
    const newCategoriesUrl = tags.slice();

    newCategoriesUrl.splice(currPos, 1);
    newCategoriesUrl.splice(newPos, 0, tag);

    setTags(newCategoriesUrl);
  };

  return (
    <ReactTags
      classNames={reactTagsClassNames}
      tags={tags}
      delimiters={[
        KeyCodes.TAB,
        KeyCodes.ENTER,
        KeyCodes.COMMA
      ]}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag} 
      {...rest}
    />
  )
}
