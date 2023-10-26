import { Image } from "phosphor-react";

export const allowedImagesMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

interface ImagesInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImagesInput({ onChange }: ImagesInputProps) {
  return (
    <label
      className="px-1 rounded-md cursor-pointer hover:bg-zinc-100 flex items-center text-sm font-semibold gap-1 text-zinc-600"
      htmlFor="images"
    >
      <Image color="gray" size={28} />
      Imagens

      <input 
        id="images"
        className="hidden"
        type="file"
        multiple
        max={4}
        maxLength={4}
        accept={allowedImagesMimes.join(", ")} 
        onChange={onChange}
      />
    </label>
  )
}