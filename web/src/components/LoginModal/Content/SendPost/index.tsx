import { Image, PaperPlaneTilt, Plus } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../contexts/Modal/ModalContext";
import { useApi } from "../../../../hooks/useApi";
import { AttachmentsListPreview } from "./AttachmentsListPreview";

export const allowedMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

export function SendPost() {
  const [title, setTitle] = useState("");
  const [description, setDescripion] = useState("");

  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const { closeModal } = useContext(ModalContext)
  const { sendPost } = useApi();
  const navigate = useNavigate();

  function handleAddThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const image = fileList[0];

    if (allowedMimes.includes(image.type)) {
      setThumbnail(image);
      setThumbnailUrl(URL.createObjectURL(image));
    }
  }

  async function handleSendPost(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData();

    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("attachments", attachments[i]);
      }
    }

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    formData.append("title", title);
    formData.append("description", description);

    const response = await sendPost(formData);

    if (!response.error) {
      closeModal();
      navigate(`/post/${response.id}`);
    }
  }

  return (
    <form 
      className="flex flex-col justify-between w-[600px] max-h-[calc(100vh-100px)] bg-slate-50 rounded-md shadow-md"
      onSubmit={handleSendPost}
    >
      <header className="flex justify-between items-center p-4 border-b border-slate-400">
        <h2 className="text-xl font-semibold">
          Título: <span className="font-normal">{title}</span>
        </h2>
        
        <PaperPlaneTilt className="text-emerald-600" size={34}/>
      </header>

      <main className="flex-1 p-6 overflow-y-scroll scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin">
        <div>

        </div>
        
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-5">
          <Image size={30} /> Thumbnail
        </h3>
        
        <div>
          <label htmlFor="thumbnail">
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
              value={title}
              onChange={e => setTitle(e.target.value)}
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
            className="resize-none min-w-[400px] min-h-[152px] px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin" 
            name="description"
            id="description"
            placeholder=""
            value={description} 
            onChange={e => setDescripion(e.target.value)}
          />
        </div>

        <AttachmentsListPreview 
          setAttachments={setAttachments}
        />
      </main>

      <footer className="flex justify-between gap-8 p-6 pt-0">
        <button
          className="flex justify-center items-center w-full py-2 rounded-md border-[1px] border-rose-500 bg-rose-500 text-white  hover:bg-rose-400 hover:border-rose-400 active:bg-rose-600 active:border-rose-600 transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-red-500 disabled:cursor-not-allowed"
          onClick={closeModal}
        >
          Cancelar
        </button>

        <button type="submit" className="flex justify-center items-center w-full py-2 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed">
          Salvar
        </button>
      </footer>
    </form>
  )
}