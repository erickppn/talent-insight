import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "react-tag-input";
import { Image, Plus, VideoCamera } from "phosphor-react";

import { ModalContext } from "../../../../../contexts/Modal/ModalContext";
import { useApi } from "../../../../../hooks/useApi";

import { VideoPlayer } from "../../../../VideoPlayer";
import { SelectCategories } from "../../../../SelectCategories";
import { Loading } from "../../../../Loading";

const allowedImagesMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

const allowedVideosMimes = [
  "video/webm",
  "video/ogg",
  "video/mpeg",
  "video/mp4"
];

const ReactTagsClassNames =  {
  tagInput: "w-full h-full relative border-b-2",
  tagInputField: "w-full p-1 bg-transparent focus:ring-0 focus:outline-none",
  selected: "flex gap-1 mt-4 [&>*]:flex [&>*]:gap-2 [&>span>*]:font-bold [&>span]:text-white flex-wrap",
  tag: "flex items-center px-2 bg-rose-300 rounded-md",
  suggestions: "flex min-w-[210px] absolute p-2 bg-white rounded-md mt-9 z-10 [&>ul]:w-full [&>ul>*]:py-2 [&>ul>*]:w-full [&>ul>*]:px-2 [&>ul>*]:rounded-md cursor-pointer before:w-4 before:h-4 before:bg-white dark:before:bg-zinc-800 before:transition-colors before:absolute before:rounded-sm before:rotate-45 before:-top-1 before:left-2",
  activeSuggestion: "bg-zinc-50"
};

export function VideoForm({ postTitle, setPostTitle } : { postTitle: string, setPostTitle: (title: string) => void }) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescripion] = useState("");
  const [videoInput, setVideoInput] = useState<File | null>(null);
  const [categories, setCategories] = useState<Tag[]>([]);
  
  const [videoUrl , setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [isSendingPost, setIsSendingPost] = useState(false);

  const { closeModal } = useContext(ModalContext)
  const { sendPost } = useApi();
  const navigate = useNavigate();

  function handleAddVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const video = fileList[0];

    if (allowedVideosMimes.includes(video.type)) {
      setVideoInput(video);
      setVideoUrl(URL.createObjectURL(video));
    }
  }
  
  function handleAddThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const image = fileList[0];

    if (allowedImagesMimes.includes(image.type)) {
      setThumbnail(image);
      setThumbnailUrl(URL.createObjectURL(image));
    }
  }

  async function handleSendPost(e: FormEvent) {
    e.preventDefault();
    setIsSendingPost(true);

    const formData = new FormData();

    if (videoInput) {
      formData.append("attachments", videoInput);
    }

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const formatedTags = categories.map(category => {
      return category.text;
    });

    const categoriesList = formatedTags.join(";");

    formData.append("title", postTitle);
    formData.append("description", description);
    formData.append("type", "video");
    formData.append("categories", categoriesList);

    const response = await sendPost(formData);

    if (!response.error) {
      closeModal();
      navigate(`/post/${response}`);
    }
  }
  
  return (
    <form 
      className="p-6"
      onSubmit={handleSendPost}
    >
      <div>
        <label className="flex flex-col" htmlFor="thumbnail">
          <h3 className="flex items-center gap-2 font-semibold mb-5">
            <Image size={30} /> Thumbnail
          </h3>

          <div className="flex justify-center items-center w-full h-72 border-dashed border border-rose-400 overflow-hidden rounded-md hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer">
            {
              thumbnail ? (
                <img src={thumbnailUrl || ""} />
              ) : (
                <Plus className="text-rose-400" size={38} />
              )
            }
          </div>
        </label>

        <input 
          className="hidden"
          type="file" 
          name="thumbnail" 
          id="thumbnail" 
          onChange={handleAddThumbnail}
          accept={allowedImagesMimes.join(", ")}
        />
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-5">Detalhes</h3>

      <div className="flex flex-col gap-3">
        <label 
          className="text-zinc-600 font-medium"
          htmlFor="title"
        >
          Título
        </label>
        
        <div className="flex items-center border-[1px] border-rose-400 rounded-md">
          <input 
            className="w-full p-2 bg-transparent border-l-[1px] border-rose-400 text-zinc-600 font-medium"
            type="text" 
            name="title" 
            id="title"
            value={postTitle}
            onChange={e => setPostTitle(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <label 
          className="text-zinc-600 font-medium"
          htmlFor="description"
        >
          Descrição
        </label>
        
        <textarea 
          className="resize-none min-w-[400px] min-h-[152px] px-5 py-3 bg-transparent border-[1px] border-rose-400 rounded-md scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin" 
          name="description"
          id="description"
          placeholder=""
          value={description} 
          onChange={e => setDescripion(e.target.value)}
        />
      </div>

      <div className="my-8">
        {
          videoUrl ? (
            <div className="flex flex-col gap-4">
              <label htmlFor="video" className="flex items-center gap-2 text-zinc-700 whitespace-nowrap">
                <VideoCamera size={30} />

                anexe seu vídeo aqui
              </label>

              <div className="w-full h-72 rounded-md overflow-hidden">
                <VideoPlayer 
                  url={videoUrl} 
                  thumbnail={thumbnailUrl}
                />
              </div>
            </div>
          ) : (
            <label className="flex flex-col gap-4" htmlFor="video">
              <div className="flex items-center gap-2 text-zinc-700 whitespace-nowrap">
                <VideoCamera size={30} />
    
                anexe seu vídeo aqui
              </div>
    
              <div className="flex justify-center items-center w-full h-80 border-dashed border border-rose-400 overflow-hidden rounded-md hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer">
                <Plus className="text-rose-400" size={38} />
              </div>
            </label>
          )
        }

        <input 
          className="hidden"
          type="file" 
          name="video" 
          id="video" 
          accept={allowedVideosMimes.join(", ")}
          onChange={handleAddVideo}
          required
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-5">Categorias</h3>

        <SelectCategories 
          categories={categories}
          setCategories={setCategories} 
          inputFieldPosition="top"
          reactTagsClassNames={ReactTagsClassNames}
        />
      </div>

      <div className="flex justify-between gap-8 mt-7">
        <button
          className="flex justify-center items-center w-full py-2 rounded-md border-[1px] border-rose-500 bg-rose-500 text-white  hover:bg-rose-400 hover:border-rose-400 active:bg-rose-600 active:border-rose-600 transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-red-500 disabled:cursor-not-allowed"
          onClick={closeModal}
        >
          Cancelar
        </button>

        <button type="submit" className="flex justify-center items-center w-full py-2 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed">
          { isSendingPost ? <Loading /> : "Salvar" }
        </button>
      </div>
    </form>
  )
}