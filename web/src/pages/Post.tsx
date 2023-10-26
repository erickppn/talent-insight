import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { CircleNotch, Heart } from "phosphor-react";

import { useApi } from "../hooks/useApi";
import { SlideShow } from "../components/SlideShow";

import { RelatedPosts } from "../components/RelatedPosts";

import { post } from "../types/Post";

import defaultAvatar from "../assets/default-avatar.png";

export function Post() {
  const [post, setPost] = useState<post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  const date = new Date(post?.postedAt || Date.now());

  const dateFormatted = format(date, "d' de 'MMMM'", {
    locale: ptBR,
  });

  const { id } = useParams();
  const api = useApi();

  async function getPostById() {
    const post = await api.getPostById(id);

    console.log(post);
    
    
    setPost(post);
    setIsLoadingPost(false);
  }

  useEffect(() => {
    getPostById();
  }, [id]);

  useEffect(() => {
    getPostById();
  }, []);

  if (isLoadingPost) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="flex items-center justify-center overflow-hidden">
          <CircleNotch weight="bold" className="w-10 h-10 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-col gap-10 2xl:flex-row 2xl:gap-8 p-10">
      <div className="flex flex-col flex-1 gap-20">
        <div className="flex-1">
          <div className="flex justify-center">
            <div className="h-full w-full max-w-4xl 2xl:max-w-[1100px] 2xl:max-h-[70vh] rounded-lg overflow-hidden aspect-video">
                  
                  <SlideShow 
                    attachments={post!.attachments}
                  />


            </div>
          </div>

          <div className="py-8 max-w-4xl 2xl:max-w-[1100px] mx-auto">
            <div className="flex items-start gap-20">
              <div className="flex-1">
                <h2 className="flex items-center text-2xl font-bold">
                  {post?.title}
                </h2>

                <span className="ml-3 text-sm text-zinc-500">• postado em {dateFormatted}</span>

                <div className="flex gap-2 items-center flex-wrap w-full my-4">
                  <span className="font-semibold">
                    Categorias:
                  </span>
                  {
                    post?.categories.map(category => (
                      <div className="flex items-center px-2 bg-rose-400 rounded-md text-lg text-white">
                        {category.category.name}
                      </div>
                    ))
                  }
                </div>

                <p className="mt-4 mb-4 text-gray-900 leading-relaxed">
                  {post?.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident assumenda facilis fugiat alias, deserunt ad id nihil, maxime mollitia eveniet repellat tempore odit molestias obcaecati incidunt nemo vel molestiae. Blanditiis.
                </p>

                <Link 
                  to={`/user/${post?.userId}`}
                  className="flex items-start gap-4 max-h-20 overflow-hidden p-2 pt-1 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                >
                  <img 
                    className="h-16 w-16 mt-1 rounded-md object-cover"
                    src={post?.user.profile.avatarUrl || defaultAvatar}  
                  />

                  <div className="leading-relaxed">
                    <strong className="font-bold text-xl block">
                      {post?.user.profile.artName || post?.user.name}
                    </strong>

                    <p className="mt-[3px] text-gray-900 text-sm block">
                      {post?.user.profile.aboutMe}
                    </p>
                  </div>
                </Link>
              </div>

              <div className="flex gap-4">
                <button className="p-3 text-sm text-white bg-rose-400 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-rose-300 transition-colors">
                  <Heart size={24} />
                </button>
                

              </div>
            </div>
          </div>

          <div className="max-w-4xl 2xl:max-w-[1100px] mx-auto">
            <RelatedPosts />
          </div>
        </div>
      </div>

      <aside className="mx-auto max-w-4xl 2xl:max-w-[418px] w-full">
        
      </aside>
    </main>
  )
}