import { FormEvent, useContext, useEffect, useState } from "react";
import { Tag } from "react-tag-input";
import classNames from "classnames";

import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useApi } from "../../../hooks/useApi";

import { ProfilePreview } from "./ProfilePreview";
import { BannerPreview } from "./BannerPreview";
import { Loading } from "../../../components/Loading";

import defaultAvatar from "../../../assets/default-avatar.png";
import { SelectCategories } from "../../../components/SelectCategories";

export const allowedMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

const aboutMeCharacterLimit = 300;

const ReactTagsClassNames =  {
  tagInput: "w-full h-full relative border-b-2",
  tagInputField: "w-full p-1 bg-transparent focus:ring-0 focus:outline-none",
  selected: "flex gap-1 mt-4 [&>*]:flex [&>*]:gap-2 [&>span>*]:font-bold [&>span]:text-white flex-wrap",
  tag: "flex items-center px-2 bg-rose-300 rounded-md",
  suggestions: "flex min-w-[210px] absolute p-2 bg-white rounded-md mt-9 z-10 [&>ul]:w-full [&>ul>*]:py-2 [&>ul>*]:w-full [&>ul>*]:px-2 [&>ul>*]:rounded-md cursor-pointer before:w-4 before:h-4 before:bg-white dark:before:bg-zinc-800 before:transition-colors before:absolute before:rounded-sm before:rotate-45 before:-top-1 before:left-2",
  activeSuggestion: "bg-zinc-50"
};
 
export function EditProfile() {
  const { profile, setProfile } = useContext(AuthContext);
  const { editUserProfile } = useApi();

  //text inputs
  const [artName, setArtName] = useState(profile?.artName || "");
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "");

  const [categories, setCategories] = useState<Tag[]>([]);

  //images inputs
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || null);
  const [bannerUrl, setBannerUrl] = useState(profile?.bannerUrl || null);

  const [newImageAvatar, setNewImageAvatar] = useState<File | null>(null);
  const [newImageBanner, setNewImageBanner] = useState<File | null>(null);

  //loader
  const [isSavingInfo, setIsSavingInfo] = useState(false);

  async function handleEditProfile(e: FormEvent) {
    e.preventDefault();
    setIsSavingInfo(true);

    const formData = new FormData();

    const formatedTags = categories.map(category => {
      return category.text;
    });

    const categoriesList = formatedTags.join(";");

    formData.append("avatar", newImageAvatar || defaultAvatar);
    formData.append("banner", newImageBanner || defaultAvatar);

    formData.append("artName", artName);
    formData.append("aboutMe", aboutMe);
    formData.append("categories", categoriesList);

    const newData = await editUserProfile(formData);

    setProfile(newData.newUserProfileInfo);
    setIsSavingInfo(false);

    setNewImageAvatar(null);
    setNewImageBanner(null);
  }

  useEffect(() => {
    const categoryTags:Tag[] = profile?.categories.map(category => {
      return {
        id: category.category.name,
        text: category.category.name
      }
    }) || [];

    setCategories(categoryTags);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div>
        <h2 className="mb-6 p-3 text-xl font-medium bg-rose-400 rounded-md text-white">
          Perfil
        </h2>

        <form onSubmit={handleEditProfile} encType="mutipart/form-data">
          <BannerPreview 
            bannerUrl={bannerUrl} 
            setBannerUrl={setBannerUrl} 
            setNewImageBanner={setNewImageBanner}
          />

          <div className="flex justify-between mt-5 pl-4">
            <ProfilePreview 
              avatarUrl={avatarUrl} 
              bannerUrl={bannerUrl}
              artName={artName} 
              aboutMe={aboutMe} 
              setAvatarUrl={setAvatarUrl} 
              setNewImageAvatar={setNewImageAvatar} 
              categories={categories}
            />

            <div className="flex flex-col items-end">
              <div className="flex gap-4">
                <div>
                  <div className="flex flex-col gap-2 max-w-[432px] w-full mb-6 bg-slate-50 p-4 rounded-md shadow-md overflow-hidden">
                    <span className="text-zinc-600 font-medium">
                      Categorias <small>- ajuda outros usuários a te acharem</small>
                    </span>

                    <SelectCategories 
                      autofocus={false}
                      tags={categories} 
                      setTags={setCategories}
                      inputFieldPosition="top"
                      reactTagsClassNames={ReactTagsClassNames}
                    />
                  </div>

                  <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-md shadow-md">
                    <label 
                      className="text-zinc-600 font-medium"
                      htmlFor="artName"
                    >
                      Nome artístico
                    </label>
                    
                    <input 
                      className="px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md"
                      type="text" 
                      name="artName" 
                      id="artName"
                      value={artName} 
                      onChange={e => setArtName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-3 mt-6 bg-slate-50 p-4 rounded-md shadow-md">
                    <label 
                    className="text-zinc-600 font-medium"
                      htmlFor="aboutMe"
                    >
                      Sobre Mim
                    </label>
                    
                    <span className={classNames("text-xs", aboutMe.length >= aboutMeCharacterLimit ? "text-rose-400" : "text-zinc-400")}>
                      limite de caracteres {aboutMe.length}/{aboutMeCharacterLimit}
                    </span>

                    <textarea 
                      className="resize-none min-w-[400px] min-h-[152px] px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin" 
                      name="aboutMe"
                      id="aboutMe"
                      placeholder="Fale um pouco sobre você..."
                      value={aboutMe} 
                      onChange={e => setAboutMe(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button 
                className="flex justify-center items-center w-full mt-5 py-2 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed"
                type="submit" 
                disabled={aboutMe.length > aboutMeCharacterLimit}
              >
                {isSavingInfo ? <Loading /> : "Salvar"}
              </button>
            </div>
          </div>
        </form> 
      </div>
    </div>
  )
}