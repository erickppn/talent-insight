import { Image, Plus } from "phosphor-react";
import { useState } from "react";

const allowedImagesMimes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif",
];

export function AttachmentsListPreview({setAttachments}: {setAttachments: (att: FileList | null) => void}) {
  const [attachmentsList, seAttachmentsList] = useState<File[] | null>();

  function handleAddAttachments(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    const fileList = files && Array.from(files);

    setAttachments(files);
    seAttachmentsList(fileList);
  }

  return (
    <div className="flex gap-2 mt-8 mb-3 pb-6 overflow-x-scroll scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin">
      <div className="w-fit">
        <label className="flex flex-col gap-4" htmlFor="attachments">
          <div className="flex items-center gap-2 text-zinc-700 whitespace-nowrap">
            <Image size={30} />

            você pode anexar até 4 imagens!
          </div>

          <div className="flex justify-center items-center relative w-52 h-28 border-dashed border border-rose-400 rounded-md hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer">
            <Plus className="text-rose-400" size={38} />

            <input 
              className="absolute w-[1px] h-[1px] text-white"
              type="file" 
              name="attachments" 
              id="attachments" 
              multiple max={4} 
              maxLength={4}
              accept={allowedImagesMimes.join(", ")}
              onChange={handleAddAttachments}
              required
            />
          </div>
        </label>
      </div>

      <div className={`flex items-end gap-2 ${attachmentsList && "-ml-[60px]"}`}>
        {
          attachmentsList?.map(attachment => (
            <div 
              key={attachment.name}
              className="flex justify-center items-center w-52 h-28 rounded-md overflow-hidden"
            >
              <img 
                className="object-center object-cover"
                src={URL.createObjectURL(attachment)}
               />
            </div>
          ))
        }
      </div>
    </div>
  )
}