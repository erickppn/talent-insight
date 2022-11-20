import { FormEvent, useContext, useState } from "react";
import classNames from "classnames";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useApi } from "../../../hooks/useApi";

import { ProfilePreview } from "./ProfilePreview";
import { BannerPreview } from "./BannerPreview";
import { Loading } from "../../../components/Loading";

import defaultAvatar from "../../../assets/default-avatar.png";

export const allowedMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

const aboutMeCharacterLimit = 300;
 
export function EditProfile() {
  const { profile, setProfile } = useContext(AuthContext);
  const { editUserProfile } = useApi();

  //text inputs
  const [artName, setArtName] = useState(profile?.artName || "");
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "");

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

    formData.append("avatar", newImageAvatar || defaultAvatar);
    formData.append("banner", newImageBanner || defaultAvatar);

    formData.append("artName", artName);
    formData.append("aboutMe", aboutMe);

    const newData = await editUserProfile(formData);

    setProfile(newData.newUserProfileInfo);
    setIsSavingInfo(false);

    setNewImageAvatar(null);
    setNewImageBanner(null);
  }

  return (
    <div className="flex flex-col items-center w-full py-6">
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
            />

            <div className="flex flex-col items-end">
              <div className="flex gap-4">
                <div>
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
                    
                    <span className={classNames("text-xs text-zinc-400", aboutMe.length > aboutMeCharacterLimit && "text-rose-400")}>
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