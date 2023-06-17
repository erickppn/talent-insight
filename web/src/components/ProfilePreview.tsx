import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Loading } from "./Loading";

import { useApi } from "../hooks/useApi";
import { PublicUserInfo } from "../types/User";

interface ProfilePreviewProps {
  userId: string,
}

import defaultAvatar from "../assets/default-avatar.png";
import { Tag } from "phosphor-react";

export function ProfilePreview({ userId }: ProfilePreviewProps) {
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const [userInfo, setUserInfo] = useState<PublicUserInfo | null>(null);

  const api = useApi();

  useEffect(() => {
    async function loadUserInfo() {
      const response = await api.getPublicUserInfo(userId);

      setUserInfo(response);
      setIsLoadingPreview(false);
    }

    loadUserInfo();
  }, []);


  if (isLoadingPreview || !userInfo) {
    return (
      <div className="flex justify-center items-center p-3 bg-white rounded-md text-rose-500">
        <Loading />
      </div>
    )
  }
  
  const dateFormatted = format(new Date(userInfo.createdAt), " d' de 'MMMM' de 'yyyy'", {
    locale: ptBR,
  });

  return (
    <div className="flex flex-col justify-center w-[260px] bg-white rounded-md overflow-hidden shadow-lg">
      <div className="w-full h-28 bg-rose-400">
        {userInfo.profile.bannerUrl && (
          <img 
            className="w-full h-full object-cover"
            src={userInfo.profile.bannerUrl} 
          />
        )}
      </div>

      <div className="flex justify-center items-center h-[86px] w-[86px] -mt-[43px] ml-4 border-4 border-white rounded-xl overflow-hidden">
        <img 
          className="w-full h-full object-cover"
          src={userInfo.profile.avatarUrl || defaultAvatar} 
          alt="Imagem de perfil do usuário" 
        />
      </div>

      <div className="flex-1 flex flex-col w-full px-5 pb-2">
        <div className="flex flex-col my-2">
          <span className="text-lg font-medium truncate leading-tight">
            {userInfo.profile.artName || `@${userInfo.name}`}
          </span>

          {userInfo.profile.artName && (
            <span className="font-medium leading-tight">@{userInfo.name}</span>
          )}
        </div>

        {userInfo.profile.aboutMe && (
          <div className="w-full mt-2 p-2 border bg-gray-100 rounded-md">
            <p className="text-sm">
              {userInfo.profile.aboutMe}
            </p>
          </div>
        )}

        {userInfo.profile.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 w-full my-3">
            {userInfo.profile.categories.map(category => (
              <Link 
                key={userInfo.id}
                to={`/search=${category.category.name}`}
                className="flex justify-center items-center gap-1 px-3 bg-rose-400 rounded-sm text-white text-sm font-semibold uppercase hover:scale-105 transition-transform"
              >
                <Tag weight="bold" />
                {category.category.name}
              </Link>
            ))}
          </div>
        )}
        
        <Link
          to={`/user/${userInfo.id}`} 
          className="flex justify-center items-center py-[6px] bg-blue-500 rounded-md text-white text-sm font-semibold uppercase hover:bg-blue-400 active:bg-blue-600 transition-colors"
        >
          Ver Perfil
        </Link>

        <hr className="w-full border-[1px] my-3" />

        <span className="w-full mb-2 text-zinc-600 text-xs">
          Entrou em {dateFormatted}
        </span>
      </div>
    </div>
  )
}