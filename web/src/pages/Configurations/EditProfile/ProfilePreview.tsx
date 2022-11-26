import { useContext } from "react";
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { UploadSimple } from "phosphor-react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";

import defaultAvatar from "../../../assets/default-avatar.png";
import { allowedMimes } from ".";

interface ProfilePreviewProps {
  avatarUrl: string | null, 
  bannerUrl: string | null,
  artName: string | null,
  aboutMe: string, 
  setAvatarUrl: (url: string) => void,
  setNewImageAvatar: (image: File) => void,
}

export function ProfilePreview({ avatarUrl, bannerUrl, artName, aboutMe, setAvatarUrl, setNewImageAvatar }: ProfilePreviewProps) {
  const { user } = useContext(AuthContext);

  const date = new Date(user?.createdAt!);

  const dateFormatted = format(date, " d' de 'MMMM'", {
    locale: ptBR,
  });

  function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const image = fileList[0];

    if (allowedMimes.includes(image.type)) {
      setNewImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  return (
    <div className="flex flex-col justify-center w-72 h-fit -mt-28 z-10 bg-slate-50 rounded-md shadow-md animate-f-bounce overflow-hidden">
      <div className="w-full h-36 bg-rose-400">
        {
          bannerUrl && (
            <img 
              className="w-full h-full object-cover"
              src={bannerUrl} alt="" 
            />
          )
        }
      </div>

      <div className="h-28 w-28 -mt-16 ml-8 rounded-full overflow-hidden">
        <label 
          className="group flex flex-col justify-center items-center relative w-full h-full overflow-hidden cursor-pointer"
        >
          <UploadSimple 
            className="absolute p-1 bg-black bg-opacity-50 rounded-full group-hover:scale-110 group-hover:bg-opacity-80 transition-all"
            color='#FFF' 
            size={26} 
            weight="bold"
          />

          <img 
            className="h-44 w-44 object-cover"
            src={avatarUrl ? avatarUrl : defaultAvatar} 
            alt="Imagem de perfil do usuário" 
          />

          <input 
            className="hidden"
            type="file" 
            accept={allowedMimes.join(", ")}
            name="avatar" 
            onChange={handleChangeAvatar}
          />
        </label>
      </div>

      <div className="flex flex-col w-full px-6 py-2">
        <div className="flex flex-col w-full">
          <span className="text-xl font-medium truncate">
            {artName || user?.name}
          </span>

          {
            artName && (
              <span className="text-lg">{user?.name}</span>
            )
          }
        </div>

        <div className="w-full h-[222px] mt-4 p-2 border-[1px] bg-slate-100 rounded-md overflow-hidden">
          <p className="text-sm text-zinc-600">
            {aboutMe}
          </p>
        </div>

        <hr className="w-full mt-4 border-[1px]"/>

        <span className="w-full mt-3 mb-2 text-zinc-600 text-xs">
          Entrou em {dateFormatted}
        </span>
      </div>
    </div>
  )
}