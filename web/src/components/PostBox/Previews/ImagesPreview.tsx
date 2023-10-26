import classNames from "classnames";
import { TrashSimple } from "phosphor-react";

interface ImagesInputProps {
  onRemove: (index: number) => void;
  imagesList: File[];
}

export function ImagesPreview({ onRemove, imagesList }: ImagesInputProps) {
  return (
    <div 
      className={classNames("w-full grid gap-4",
        imagesList.length > 2 && "grid-rows-2",
        (imagesList.length === 2 || imagesList.length === 4) && "grid-cols-2",
        imagesList.length === 3 && "grid-cols-12",
      )}
    >
      {
        imagesList.map((attachment, i) => (
          <div
            key={attachment.name + i}
            className={classNames("relative group bg-black rounded-lg overflow-hidden cursor-pointer",
              imagesList.length === 3 && "first:col-span-5 first:row-span-2",
              (imagesList.length === 3 && i > 0) && "col-span-7"
            )}
          >
            <img
              className="group-hover:scale-105 group-hover:opacity-50 transition duration-500 aspect-video object-center object-cover w-full h-full" 
              src={URL.createObjectURL(attachment)}
              alt={attachment.name}
            />

            <button 
              type="button"
              className="absolute right-3 bottom-3 p-1 rounded-md opacity-80 bg-rose-700 text-white hover:opacity-50 transition-opacity" 
              onClick={() => onRemove(i)}
            >
              <TrashSimple size={24} weight="bold" />
            </button>
          </div>
        ))
      }
    </div>
  )
}