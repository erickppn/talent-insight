import { useState } from "react";
import classNames from "classnames";
import { PencilSimple, UserGear, Warning } from "phosphor-react";

import { EditAccount } from "./EditAccount";
import { EditProfile } from "./EditProfile";
import { DangerArea } from "./DangerArea";

const menuOptions = [
  {
    optionId: 1,
    name: "Editar perfil",
    icon: <PencilSimple size={20} weight="regular"/>
  },
  {
    optionId: 2,
    name: "Configurações da conta",
    icon: <UserGear size={20} weight="regular"/> 
  },
  {
    optionId: 3,
    name: "Danger área",
    icon: <Warning size={20} weight="regular"/>,
    isDangerArea: true
  },
]

export function Configurations() {
  const [linkIsActive, setLinkIsActive] = useState(1);

  function changeLinkIsActive(linkId: number) {
    setLinkIsActive(linkId);
  }

  return (
    <div className="flex flex-1">
      <nav className="flex flex-col w-72 p-6 px-3 border-r-2">
        <h1 className="w-full text-lg font-medium mb-6">
          Configurações
        </h1>

        <ul className="flex flex-col gap-[2px]">
          {menuOptions.map(option => (
            <li key={option.optionId}>
              <button 
                onClick={() => changeLinkIsActive(option.optionId)} 
                className={ classNames("flex items-center gap-2 w-full rounded-xl p-3 text-zinc-700 text-sm hover:bg-slate-50 transition-colors", 
                  linkIsActive == option.optionId && "text-zinc-900 bg-slate-50",
                  option.isDangerArea && " text-rose-500"
              )}>
                {option.icon} {option.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      { 
        linkIsActive === 1 ? (
          <EditProfile />
        ) : linkIsActive === 2 ? (
          <EditAccount />
        ) : (
          <DangerArea />
        )
      }
    </div>
  )
}