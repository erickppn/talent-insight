import React, { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useApi } from "../../../hooks/useApi";

const allowedMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

import defaultAvatar from "../../../assets/floppa.png";
import { Loading } from "../../../components/Loading";
import { ProfilePreview } from "./ProfilePreview";

export function EditProfile() {
  const { profile, setProfile } = useContext(AuthContext);

  const [artName, setArtName] = useState(profile?.artName || "");
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "");
  const [avatarUrl, setavatarUrl] = useState(profile?.avatarUrl || null);

  const [newImageAvatar, setNewImageAvatar] = useState<File | null>(null);

  const [isSavingInfo, setIsSavingInfo] = useState(false);

  const { editUserProfile } = useApi();

  function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const image = fileList[0];

    if (allowedMimes.includes(image.type)) {
      setNewImageAvatar(image);
      setavatarUrl(URL.createObjectURL(image));
    }
  }

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
          <div className="flex justify-center items-center max-w-[756px] h-52 bg-rose-400 rounded-md">banner</div>

          <div className="flex gap-10 mt-5">
            <ProfilePreview 
              avatarUrl={avatarUrl}
              artName={artName}
              aboutMe={aboutMe} 
              handleChangeAvatar={handleChangeAvatar}
            />

            <div className="flex flex-col items-end">
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
                    
                    <span className="text-xs text-zinc-400">
                      limite de caracteres {aboutMe.length}/190
                    </span>

                    <textarea 
                      className="resize-none min-w-[400px] min-h-[152px] px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md" 
                      name="aboutMe"
                      id="aboutMe"
                      placeholder="Fale um pouco sobre você..."
                      value={aboutMe} 
                      onChange={e => setAboutMe(e.target.value)}
                      maxLength={190}
                    />
                  </div>
                </div>
              </div>

              <button 
                className="flex justify-center items-center w-24 mt-6 py-1 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                type="submit" 
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