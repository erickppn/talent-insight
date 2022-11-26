import { useEffect, useState } from "react";
import { CircleNotch, Heart, UserPlus } from "phosphor-react";
import { useApi } from "../hooks/useApi";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";

import defaultAvatar from "../assets/default-avatar.png";
import { SlideShow } from "../components/SlideShow";

import { post } from "../types/Post";

export function Post() {
  const [post, setPost] = useState<post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  const { id } = useParams();
  const api = useApi();

  useEffect(() => {
    async function getPostById() {
      const post = await api.getPostById(id);
      
      setPost(post);
      setIsLoadingPost(false);
    }

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
    <main className="flex p-10">
      <div className="flex flex-col flex-1 gap-20">
        <div className="flex-1">
          <div className="flex justify-center">
            <div className="h-full w-full max-w-[1100px] max-h-[70vh] rounded-lg overflow-hidden aspect-video">
              {
                post?.type === "video" ? (
                  <VideoPlayer 
                    url={post?.attachments[0].attachmentUrl || ""}
                    thumbnail={post?.thumbnailUrl || ""}
                  />
                ) : post?.type === "images" && (
                  <SlideShow 
                    attachments={post.attachments}
                  />
                )
              }
            </div>
          </div>

          <div className="py-8 max-w-[1100px] mx-auto">
            <div className="flex items-start gap-20">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <img 
                    className="h-16 w-16 rounded-md object-cover"
                    src={post?.user.profile.avatarUrl || defaultAvatar}  
                  />

                  <div className="leading-relaxed">
                    <strong className="font-bold text-2xl block">
                      {post?.user.profile.artName ? post.user.profile.artName : post?.user.name}
                    </strong>

                    <span className="text-gray-900 text-sm block">
                      {post?.user.profile.aboutMe}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-10">
                  {post?.title}
                </h2>

                <p className="mt-4 text-gray-900 leading-relaxed">
                  {post?.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button className="p-3 text-sm text-white bg-rose-400 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-rose-300 transition-colors">
                  <Heart size={24} />
                </button>
                
                <button className="px-5 py-3 text-sm text-white bg-rose-400 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-rose-300 transition-colors">
                  <UserPlus size={24} /> Seguir Usuário
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-[418px] p-6">

      </aside>
    </main>
  )
}