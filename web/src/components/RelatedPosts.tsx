import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useApi } from "../hooks/useApi";

type RelatedPost = {
  id: string,
  title: string,
  thumbnailUrl: string,
  postedAt: string,
}

export function RelatedPosts({ userId }: { userId: string | undefined }) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);

  const { id } = useParams();
  const api = useApi();

  useEffect(() => {
    async function getRelatedPosts() {
      const response = await api.getUserRelatedPosts(id, userId);

      if (response.error) return console.log(response.message);

      setRelatedPosts(response);
    }

    getRelatedPosts();
  }, []);

  return (
    <div className="">
      <h3 className="text-2xl font-bold">Mais posts deste usuário</h3>

      <div className="flex gap-4 mt-6">
      {
        relatedPosts.map(post => (
          <RelatedPost 
            key={post.id}
            id={post.id}
            thumbnailUrl={post.thumbnailUrl}
            title={post.title}
            postedAt={post.postedAt}
          />
        ))
      }
      </div>
    </div>
  )
}

function RelatedPost({ id, thumbnailUrl, title, postedAt }: RelatedPost) {
  const date = new Date(postedAt || Date.now());

  const dateFormatted = format(date, "d' de 'MMMM'", {
    locale: ptBR,
  });

  return (
    <Link 
      className="flex flex-col max-w-[212px] w-full"
      key={id}
      to={`/post/${id}`}
    >
      <img 
        className="h-28 object-center object-cover rounded-md overflow-hidden"
        src={thumbnailUrl || "https://media.istockphoto.com/vectors/media-player-design-modern-video-player-design-template-for-web-and-vector-id1128432423?k=20&m=1128432423&s=170667a&w=0&h=MFOXY-vttjUa5tkKY3oPOJNm7QN3sPlqjYoAoTb--78="} 
      />

      <div>  
        <h4 className="text-lg font-bold truncate">{title}</h4>
        <span className="text-sm text-zinc-500">{dateFormatted}</span>
      </div>
    </Link>
  )
}