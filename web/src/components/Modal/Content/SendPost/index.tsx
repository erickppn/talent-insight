import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { PaperPlaneTilt } from "phosphor-react";

import { ImagesForm } from "./ImagesForm";
import classNames from "classnames";

export function SendPost() {
  const [title, setTitle] = useState("");

  return (
    <div 
      className="flex flex-col justify-between w-[600px] max-h-[calc(100vh-100px)] bg-slate-50 rounded-md shadow-md"
    >
      <header className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">
          Título: <span className="font-normal">{title}</span>
        </h2>
        
        <PaperPlaneTilt className="text-emerald-600" size={34}/>
      </header>

      <div className="overflow-y-scroll scrollbar-thumb-red-300 hover:scrollbar-thumb-red-200 active:scrollbar-thumb-red-400 scrollbar-track-transparent scrollbar-thin">
        <Tab.Group>
          <Tab.List className="flex justify-between">
            <Tab as={Fragment}>
              {({selected}) => (
                <button className={classNames("flex-1 p-3 pt-0 border-b-2 text-lg font-semibold uppercase", selected && "text-sky-600 border-b border-b-sky-600")}>
                  Imagens
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({selected}) => (
                <button className={classNames("flex-1 p-3 pt-0 border-b-2 text-lg font-semibold uppercase", selected && "text-sky-600 border-b border-b-sky-600")}>
                  Vídeo
                </button>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <ImagesForm 
                postTitle={title} 
                setPostTitle={setTitle}
              />
            </Tab.Panel>
            
            <Tab.Panel>
              Content 2
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}