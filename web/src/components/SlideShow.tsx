import { CaretLeft, CaretRight } from "phosphor-react";
import { Fade } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

import { attachment } from "../types/Post";

const indicators = (index: number | undefined) => (
  <div className="m-6 [&.active>div]:bg-rose-400 ">
    <div className="w-10 h-3 bg-slate-300 absolute bottom-2 z-10" />
  </div>
)

const properties = {
  prevArrow: <button className="flex justify-center items-center ml-4 p-2 bg-zinc-300 rounded-md" ><CaretLeft size={30} weight="bold"/></button>,
  nextArrow: <button className="flex justify-center items-center mr-4 p-2 bg-zinc-300 rounded-md" ><CaretRight size={30} weight="bold" /></button>,
}

export function SlideShow({ attachments }: {attachments: attachment[]}) {
  return (
    <div className="w-full h-full relative">
      <Fade cssClass="h-full border-red-800" indicators={indicators} {...properties}>
        {
          attachments.map((attachment) => (
            <div 
              className="flex justify-center items-center w-full h-full bg-zinc-900"
              key={attachment.id}
            >
              <img 
                src={attachment.attachmentUrl} 
                className="w-full aspect-video object-fill"
              />
            </div>
          ))
        }
      </Fade>
    </div>
  )
}