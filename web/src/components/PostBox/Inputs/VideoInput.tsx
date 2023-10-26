import { VideoCamera } from "phosphor-react";

export const allowedVideosMimes = [
  "video/webm",
  "video/ogg",
  "video/mpeg",
  "video/mp4"
];

interface VideoInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideoInput({ onChange }: VideoInputProps) {
  return (
    <label
      className="group group-focus:border-4 px-1 rounded-md cursor-pointer hover:bg-zinc-100 flex items-center text-sm font-semibold gap-1 text-zinc-600"
      htmlFor="video"
    >
      <VideoCamera color="gray" size={28} />
      Vídeo

      <input
        className="hidden"
        type="file"
        id="video"
        accept={allowedVideosMimes.join(", ")} 
        onChange={onChange}
      />
    </label>
  )
}