import { Link } from "react-router-dom";
import * as Popover from '@radix-ui/react-popover';
import { Heart, Eye } from "phosphor-react";
import classNames from "classnames";

import defaultAvatar from "../../assets/default-avatar.png";

import { PublicUserInfo } from "../../types/User";
import { ProfilePreview } from "../ProfilePreview";

interface ProfileProps {
  sideBarStatus: boolean,

  user: PublicUserInfo,
  likesInWeek?: number,
  viewsInWeek?: number,
}

export function Profile({ sideBarStatus, user, likesInWeek, viewsInWeek }: ProfileProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className={classNames("flex items-center gap-3 w-full rounded-md hover:scale-105 transition-transform",
      )}>
        <img 
          className="w-8 h-8 rounded-md object-cover"
          src={user.profile.avatarUrl || defaultAvatar}
        />

        <div className={classNames("flex-1 flex flex-col", 
          !sideBarStatus && "hidden"
        )}>
          <span className="text-start font-medium text-sm text-blue-900 whitespace-nowrap">
            {user.profile.artName || user.name}
          </span>

          <div className="flex gap-2">
            {likesInWeek && (
              <span className="flex items-center gap-[2px] font-medium text-xs leading-tight text-rose-500">
                <Heart weight="fill" size={14} />
                {likesInWeek}
              </span>
            )}

            {viewsInWeek && (
              <span className="flex items-center gap-[2px] font-medium text-xs leading-tight text-blue-500">
                <Eye weight="fill" size={14} />
                {viewsInWeek}
              </span>
            )}
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content side="right" sideOffset={22} className="mt-4">
          <ProfilePreview userId={user.id} />

          <Popover.Arrow height={8} width={16} className="fill-white "/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}