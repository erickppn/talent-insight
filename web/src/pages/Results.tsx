import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SmileyXEyes } from "phosphor-react";

import { useApi } from "../hooks/useApi";
import { Loading } from "../components/Loading";

import { PostLink } from "../components/PostLink";
import { ProfileLink } from "../components/ProfileLink";

type userResponse = {
  id: string,
  name: string,
  createdAt: string,

  profile: {
    artName: string,
    aboutMe: string,
    avatarUrl: string,
    bannerUrl: string,

    categories: { category: { name: string } }[]
  }
}

type postResponse = {
  id: string,
  title: string,
  thumbnailUrl: string,
  postedAt: string,
  type: string,
  likes: number,

  attachments: [{
    attachmentKey: string,
    attachmentUrl: string
    id: string
    postId: string
  }]

  user: {
    id: string,
    name: string,

    profile: {
      artName: string,
      avatarUrl: string,
      bannerUrl: string,
    }
  }
}

export function Results() {
  const [users, setUsers] = useState<userResponse[]>([]);
  const [posts, setPosts] = useState<postResponse[]>([]);

  const [isSearchingContent, setIsSearchingContent] = useState(true);

  const { categoriesInUrl } = useParams();
  const api = useApi();

  useEffect(() => {
    async function LoadResults() {
      setIsSearchingContent(true);

      const response = await api.getUsersAndPostsByCategories(categoriesInUrl || "");

      if (response.error) return console.log(response.message);

      setUsers(response.users);
      setPosts(response.posts);

      setIsSearchingContent(false);
    }

    LoadResults();
  }, [categoriesInUrl]);

  if (isSearchingContent) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Loading />
      </div>
    )
  }

  if (!users.length && !posts.length) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <SmileyXEyes size={88} />
        Nada encontrado
      </div>
    )
  }

  return (
    <div 
      className="flex justify-center"
    >
      <div className="flex flex-col md:max-w-[1056px] 2xl:max-w-[1600px] w-full mx-8 pb-6">
        <h2 className="text-xl font-semibold mt-6">
          Perfis encontrados
        </h2>

        <div className="flex gap-6 flex-wrap max-w-full py-6 border-b-2">
          {
            users && users.map((user, index) => (
              <ProfileLink 
                index={index}
                key={user.profile.artName}
                userId={user.id}
                avatarUrl={user.profile.avatarUrl}
                bannerUrl={user.profile.bannerUrl}
                userName={user.name}
                userArtName={user.profile.artName}
                aboutMe={user.profile.aboutMe}
                createdAt={user.createdAt}
                categories={user.profile.categories}
              />
            ))
          }
        </div>

        <h2 className="text-xl font-semibold my-6">
          Posts encontrados
        </h2>

        <div className="flex gap-6 flex-wrap">
          {
            posts && posts.map((post, index) => {
              const thumbnail = post.type === "images" ? (post.thumbnailUrl || post.attachments[0].attachmentUrl) : (post.thumbnailUrl || "https://media.istockphoto.com/vectors/media-player-design-modern-video-player-design-template-for-web-and-vector-id1128432423?k=20&m=1128432423&s=170667a&w=0&h=MFOXY-vttjUa5tkKY3oPOJNm7QN3sPlqjYoAoTb--78=");

              return (
                <PostLink 
                  key={post.id}
                  index={index}
                  postId={post.id}
                  postTitle={post.title}
                  postThumbnailUrl={thumbnail}
                  postLikes={post.likes}
                  postPostedAt={post.postedAt}
                  userId={post.user.id}
                  userName={post.user.name}
                  userArtName={post.user.profile.artName}
                  userAvatarUrl={post.user.profile.avatarUrl}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}