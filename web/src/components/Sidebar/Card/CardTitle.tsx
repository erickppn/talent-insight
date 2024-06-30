import { useContext } from "react"
import classNames from "classnames";
import { IconProps } from "phosphor-react";

import { SidebarContext } from "../../../contexts/Sidebar/SidebarProvider"

interface CardTitleProps extends IconProps {
  title: string,
}

export function CardTitle({ title }: CardTitleProps) {
  const { sidebarIsExpanded } = useContext(SidebarContext);

  return (
    <span className={classNames("text-sm text-gray-400 font-semibold uppercase tracking-wide whitespace-nowrap",
      sidebarIsExpanded ? "" : "hidden"
    )}>
      {title}
    </span>
  )
}