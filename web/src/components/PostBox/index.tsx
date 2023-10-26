import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Tag } from "react-tag-input";

import { PaperPlaneRight } from "phosphor-react";
import { EmojiClickData } from "emoji-picker-react";
import classNames from "classnames";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useApi } from "../../hooks/useApi";

import { DescriptionInput } from "./Inputs/DescriptionInput";
import { ImagesInput } from "./Inputs/ImagesInput";
import { VideoInput, allowedVideosMimes } from "./Inputs/VideoInput";
import { TagsInput } from "./Inputs/TagsInput";
import { EmojiInput } from "./Inputs/EmojiInput";
import { Loading } from "../Loading";

import { ImagesPreview } from "./Previews/ImagesPreview";
import { VideoPreview } from "./Previews/VideoPreview";

import defaultAvatar from "../../assets/default-avatar.png";

export interface IPostForm {
  description: string;
  attachments: File[];
  categories: Tag[];
}

export function PostBox() {
  const { register, handleSubmit, watch, getValues, setValue } = useForm<IPostForm>();

  const [attachments, setAttachments] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<Tag[]>([]);

  const { profile } = useContext(AuthContext);

  const { sendPost } = useApi();
  const navigate = useNavigate();

  const [isSendingPost, setIsSendingPost] = useState(false);

  async function handlePost(data: IPostForm) {
    const formData = new FormData();
    setIsSendingPost(true);

    // Add the description content on the form data
    formData.append("description", getValues("description"));

    // Add the attachments list on the form data
    for (const attachment of attachments) {
      formData.append("attachments", attachment);
    }

    // Add the category list on the form data
    for (const category of categories) {
      formData.append("categories", category.text);
    }

    const response = await sendPost(formData);

    if (!response.error) {
      navigate(`/post/${response}`);
    }

    setIsSendingPost(false);
  }

  function handleAddAttachments(e: React.ChangeEvent<HTMLInputElement>) {
    if (attachments.length === 4) return;

    if (!e.target.files || !e.target.files?.length) return;

    const files = convertFileListInFileArray(e.target.files);

    setAttachments([]);
    setVideoUrl(null);

    const isVideo = checkIfIsVideo(files);

    if (isVideo) {
      setVideoUrl(URL.createObjectURL(files[0]));
      setAttachments(files);
      return;
    }

    const oldFileList = attachments;

    if (oldFileList.length > 0 && checkIfIsVideo(oldFileList)) {
      return setAttachments([...files]);
    }

    setAttachments([...oldFileList, ...files]);
  }

  function handleRemoveAttachment(index: number) {
    setAttachments(attachments.filter((file, i) => i !== index));
  }

  function checkIfIsVideo(files: File[]) {
    return allowedVideosMimes.includes(files[0].type);
  }

  function convertFileListInFileArray(fileList: FileList) {
    const files: File[] = [];

    for (let i = 0; i < 4; i++) {
      const file = fileList.item(i);

      if (file) files[i] = fileList.item(i)!;
    }

    return files;
  }

  function onEmojiClick(emoji: EmojiClickData, event: MouseEvent) {
    setValue("description", getValues("description") + emoji.emoji);
  }

  return (
    <form
      onSubmit={handleSubmit(handlePost)}
      className={classNames(
        "p-4 bg-white rounded-lg transition-opacity duration-500",
        isSendingPost && "opacity-60"
      )}
    >
      <div className="flex gap-3">
        <div className="min-h-[2.75rem] min-w-[2.75rem] w-11 h-11 rounded-md overflow-hidden">
          <img src={profile?.avatarUrl || defaultAvatar} alt="Minha foto de perfil" className="h-full w-full object-cover" />
        </div>

        <DescriptionInput register={register} watch={watch} />
      </div>

      {attachments.length > 0 && (
        <div className="w-full pl-14 mt-4 flex gap-2">
          {
            videoUrl
              ? <VideoPreview onRemove={handleRemoveAttachment} url={videoUrl} />
              : <ImagesPreview imagesList={attachments} onRemove={handleRemoveAttachment} />
          }
        </div>
      )}

      {(attachments.length > 0 || getValues('description')) && (
        <TagsInput
          categories={categories}
          handleChangeCategories={setCategories}
        />
      )}

      <div className="flex justify-between mt-3">
        <div className="flex gap-1">
          <ImagesInput onChange={handleAddAttachments} />

          <VideoInput onChange={handleAddAttachments} />

          <EmojiInput onEmojiClick={onEmojiClick} />
        </div>

        <button
          className="flex gap-2 items-center justify-center min-w-[110px] h-fit py-1 px-3 border-[1px] rounded-md font-medium bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400 disabled:opacity-60 disabled:hover:bg-blue-500 disabled:hover:border-blue-500 transition-all duration-400"
          type="submit"
          disabled={!(attachments.length > 0 || getValues('description')) || isSendingPost}
        >
          {
            isSendingPost
              ? <Loading />
              : (
                <>
                  Publicar
                  <PaperPlaneRight size={18} weight="bold" className="animate-x-bounce transition-transform duration-1000" />
                </>
              )
          }
        </button>
      </div>
    </form>
  )
}