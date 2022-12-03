import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "phosphor-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import defaultAvatar from "../assets/default-avatar.png";
import classNames from "classnames";

interface PostLinkProps {
  index?: number,

  postId: string,
  postTitle: string,
  postThumbnailUrl: string,
  postPostedAt: string,
  postLikes: number,

  userId: string,
  userName: string,

  userArtName: string,
  userAvatarUrl: string,
}

const animationDelayBase = 200;

export function PostLink(props: PostLinkProps) {
  const [fade, setFade] = useState(false);

  const date = new Date(props.postPostedAt);

  const dateFormatted = format(date, " d'/'MM'/'yy'", {
    locale: ptBR,
  });

  setTimeout(() => {
    setFade(true);
  }, (animationDelayBase * props.index!))
  
  return (
    <Link 
      to={`/post/${props.postId}`}
      style={{ animationDelay: `${(animationDelayBase * (props.index || 0))}ms` }}
      className={
        classNames("max-w-lg w-full mb-6 block animate-f-bounce transition-all hover:-translate-y-3",
          fade ? 'opacity-1' : 'opacity-0',
      )}>
      <img
        className="w-full max-h-[270px] object-cover h-auto rounded-lg" 
        src={props.postThumbnailUrl} 
      />

      <div className="flex justify-between mt-2 mb-2 px-2">
        <span 
          className="text-xl font-medium truncate"
        >
          {props.postTitle}
        </span>

        <span className="flex items-center gap-1 font-semibold text-rose-500">
          {props.postLikes}
          <Heart size={24} weight="fill" />
        </span>
      </div>

      <div className="flex justify-between gap-6 items-center px-2">
        <Link 
          to={`/user/${props.userId}`}
          className="flex items-center gap-2 w-full rounded-lg transition-colors hover:underline"
        >
          <div className="flex justify-center items-center h-10 w-10 rounded-full overflow-hidden">
            <img 
              className="w-full h-full object-cover"
              src={props.userAvatarUrl || defaultAvatar} 
              alt="Imagem de perfil do usuário" 
            />
          </div>

          <div className="flex-1 flex flex-col w-full">
            <span className="text-lg font-medium truncate">
              {props.userArtName || props.userName}
            </span>
          </div>
        </Link>

        <span className="mt-3 mb-2 text-zinc-600">
          {dateFormatted}
        </span>
      </div>
    </Link>
  )
}