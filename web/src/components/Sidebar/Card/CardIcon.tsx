import { ElementType, useContext } from "react";
import { IconProps } from "phosphor-react";
import classNames from "classnames";

import { SidebarContext } from "../../../contexts/Sidebar/SidebarProvider";
import { twMerge } from "tailwind-merge";

interface cardIconProps extends IconProps {
  icon: ElementType,
}

export function CardIcon({icon: Icon, ...rest }: cardIconProps) {
  const { sidebarIsExpanded } = useContext(SidebarContext);
  
  return (
    <div className={classNames(!sidebarIsExpanded && "m-auto")}>
      <Icon
        {...rest}
        className={twMerge("min-w-[24px] min-h-[24px]", rest.className)}
      />
    </div>
  )
}