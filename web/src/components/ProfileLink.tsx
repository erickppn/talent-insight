import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import defaultAvatar from "../assets/default-avatar.png";
import classNames from "classnames";

interface ProfileLinkProps {
  index?: number,
  userId: string,
  bannerUrl: string | null,
  avatarUrl: string,
  userName: string,
  userArtName: string | null,
  aboutMe: string | null,
  createdAt: string,

  categories: { category: { name: string } }[]
}

const animationDelayBase = 200;

export function ProfileLink(props: ProfileLinkProps) {
  const [fade, setFade] = useState(false);

  const date = new Date(props.createdAt);
  
  const dateFormatted = format(date, " d' de 'MMMM' de 'yyyy'", {
    locale: ptBR,
  });
  
  setTimeout(() => {
    setFade(true);
  }, (animationDelayBase * props.index!))

  return (
    <Link 
      to={`/user/${props.userId}`} 
      style={{ animationDelay: `${animationDelayBase * (props.index || 0)}ms` }}
      className={
        classNames("flex flex-col justify-center w-[250px] h-full bg-slate-50 rounded-md animate-f-bounce overflow-hidden transition-all hover:-translate-y-3",
          fade ? 'opacity-1' : 'opacity-0',
      )}>
      <div className="w-full h-32 bg-rose-400">
        {
          props.bannerUrl && (
            <img 
              className="w-full h-full object-cover"
              src={props.bannerUrl} 
            />
          )
        }
      </div>

      <div className="flex justify-center items-center h-24 w-24 -mt-14 ml-4 rounded-full overflow-hidden">
        <img 
          className="w-full h-full object-cover"
          src={props.avatarUrl || defaultAvatar} 
          alt="Imagem de perfil do usuário" 
        />
      </div>

      <div className="flex-1 flex flex-col w-full px-6 py-2">
        <div className="flex-1 flex flex-col w-full">
          <span className="text-lg font-medium truncate">
            {props.userArtName || props.userName}
          </span>

          {
            props.userArtName && (
              <span className="text-sm font-medium">{props.userName}</span>
            )
          }
        </div>

        {
          props.aboutMe && (
            <div className="w-full max-h-[75px] mt-4 p-2 border-[1px] bg-slate-100 rounded-md overflow-hidden">
              <p className="text-sm text-zinc-600">
                {props.aboutMe}
              </p>
            </div>
          )
        }

        <div className="flex gap-1 w-full mt-3 pb-4 overflow-x-auto scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin">
          {
            props.categories.map(category => (
              <div className="flex items-center px-2 bg-rose-300 rounded-md text-white">
                {category.category.name}
              </div>
            ))
          }
        </div>

        <hr className="w-full mt-4 border-[1px]"/>

        <span className="w-full mt-3 mb-2 text-zinc-600 text-xs">
          Entrou em {dateFormatted}
        </span>
      </div>
    </Link>
  )
}