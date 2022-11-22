import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Plus, VideoCamera } from "phosphor-react";
import { ModalContext } from "../../../../../contexts/Modal/ModalContext";
import { useApi } from "../../../../../hooks/useApi";

const allowedImagesMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

const allowedVideosMimes = [
  "video/mp4",
]

export function VideoForm({ postTitle, setPostTitle } : { postTitle: string, setPostTitle: (title: string) => void }) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescripion] = useState("");
  const [videoInput, setVideoInput] = useState<File | null>(null);
  
  const [videoUrl , setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

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

    const formData = new FormData();

    if (videoInput) {
      formData.append("attachments", videoInput);
    }

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    formData.append("title", postTitle);
    formData.append("description", description);

    const response = await sendPost(formData);

    if (!response.error) {
      closeModal();
      navigate(`/post/${response.id}`);
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
          required
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

      <div className="mt-8">
        {
          videoUrl ? (
            <div className="flex flex-col gap-4">
              <label htmlFor="video" className="flex items-center gap-2 text-zinc-700 whitespace-nowrap">
                <VideoCamera size={30} />

                anexe seu vídeo aqui
              </label>

              <video 
                className="max-w-full max-h-80 bg-black rounded-md"
                src={videoUrl}
                controls={true}
                poster={thumbnailUrl || ""}
              />
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
          onChange={handleAddVideo}
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
          Salvar
        </button>
      </div>
    </form>
  )
}