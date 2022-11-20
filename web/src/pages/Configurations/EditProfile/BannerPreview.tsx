import { UploadSimple } from "phosphor-react";

import { allowedMimes } from ".";

interface BannerPreviewProps {
  bannerUrl: string | null,
  setBannerUrl: (url: string) => void,
  setNewImageBanner: (image: File) => void,
}

export function BannerPreview({ bannerUrl, setBannerUrl, setNewImageBanner }: BannerPreviewProps) {

  function handleChangeBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const image = fileList[0];

    if (allowedMimes.includes(image.type)) {
      setNewImageBanner(image);
      setBannerUrl(URL.createObjectURL(image));
    }
  }

  return (
    <label className="flex justify-center items-center w-[756px] h-96 border-[2px] border-dashed border-rose-400 rounded-md overflow-hidden cursor-pointer">
      <div 
        className="group flex flex-col justify-center items-center w-full h-full relative"
      >
        <UploadSimple 
          className="absolute p-1 bg-black bg-opacity-60 rounded-full group-hover:scale-110 group-hover:bg-opacity-70 transition-all"
          color='#FFF' 
          size={26} 
          weight="bold"
        />
        
        {
          bannerUrl && (
            <img 
              className="w-full h-full object-cover"
              src={bannerUrl} alt="" 
            />
          )
        }

        <input 
          className="hidden"
          type="file" 
          accept="image/*" 
          name="avatar" 
          multiple
          onChange={handleChangeBanner}
        />
      </div>
    </label>
  )
}