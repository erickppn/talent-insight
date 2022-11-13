import React, { FormEvent, useContext, useState } from "react";
import classNames from "classnames";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useApi } from "../../../hooks/useApi";
import { Loading } from "../../../components/Loading";
import { ProfilePreview } from "./ProfilePreview";

import defaultAvatar from "../../../assets/floppa.png";

export const allowedMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

const aboutMeCharacterLimit = 300;
 
export function EditProfile() {
  const { profile, setProfile } = useContext(AuthContext);

  const [artName, setArtName] = useState(profile?.artName || "");
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || null);

  const [newImageAvatar, setNewImageAvatar] = useState<File | null>(null);

  const [isSavingInfo, setIsSavingInfo] = useState(false);

  const { editUserProfile } = useApi();

  async function handleEditProfile(e: FormEvent) {
    e.preventDefault();
    setIsSavingInfo(true);

    const formData = new FormData();

    formData.append("avatar", newImageAvatar || defaultAvatar);

    formData.append("artName", artName);
    formData.append("aboutMe", aboutMe);

    const newData = await editUserProfile(formData);

    setProfile(newData.newUserProfileInfo);
    setIsSavingInfo(false);
  }

  return (
    <div className="flex flex-col items-center w-full py-6">
      <div>
        <h2 className="mb-6 text-xl font-medium">Perfil</h2>

        <form onSubmit={handleEditProfile} encType="mutipart/form-data">
          <div className="flex justify-center items-center max-w-[756px] h-52 bg-rose-400 rounded-md text-white">banner (em breve)</div>

          <div className="flex gap-10 mt-5">
            <ProfilePreview 
              avatarUrl={avatarUrl}
              artName={artName}
              aboutMe={aboutMe} 
              setAvatarUrl={setAvatarUrl}
              setNewImageAvatar={setNewImageAvatar}
            />

            <div className="flex flex-col justify-between items-end">
              <div className="flex gap-4">
                <div>
                  <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-md">
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

                  <div className="flex flex-col gap-3 mt-6 bg-slate-50 p-4 rounded-md">
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
                className="flex justify-center items-center w-full mt-6 py-2 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed"
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