import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { PlugsConnected, SignIn, ThumbsUp, Trophy, Users } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";

import { Menu } from "./Menu";
import { ListCard } from "./ListCard";
import { Profile } from "./Profile";

import { useApi } from "../../hooks/useApi";

import { PublicUserInfo } from "../../types/User";

export function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(JSON.parse(localStorage.getItem("tl-sidebar") || "true"));
  const [topRatedUsers, setTopRatedUsers] = useState<PublicUserInfo[]>([]);

  const { user, following } = useContext(AuthContext);
  const { openLogin } = useContext(ModalContext);

  const { getUsersByRating } = useApi();

  useEffect(() => {
    localStorage.setItem("tl-sidebar", JSON.stringify(isSidebarActive));
  }, [isSidebarActive]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUsersByRating();

      if (response.error) {
        return console.log(response);
      }

      setTopRatedUsers(response);
    }

    fetchUsers();
  }, []);

return (
  <aside
    className={classNames(
      "flex flex-col p-6 overflow-y-auto scrollbar-none transition-all ease-out duration-500 overflow-hidden",
      isSidebarActive ? "w-72" : "w-28"
    )}
  >
    {/* Sidebar menu with useful links */}
    <Menu sideBarStatus={isSidebarActive} toggleSideBarStatus={setIsSidebarActive} />

    <main className="flex flex-col gap-6">
      {/* Card of top users of current week */}
      <ListCard
        sideBarStatus={isSidebarActive}
        cardTitle="Talentos conhecidos"
        icon={
          <Trophy
            className="min-w-[24px] min-h-[24px] text-amber-500"
            weight="fill"
            size={24}
          />
        }
      >
        {topRatedUsers.map(user => (
          <Profile
            key={user.id}
            sideBarStatus={isSidebarActive}
            user={user}
            likesInWeek={2134}
            viewsInWeek={12321}
          />
        ))}
      </ListCard>

      {/* Followed users card */}
      <ListCard
        sideBarStatus={isSidebarActive}
        cardTitle={user && following.length ? "Seguindo" : undefined}
        icon={user && following.length ?
          <Users
            className="min-w-[24px] min-h-[24px m-auto] text-gray-400"
            weight="regular"
            size={24}
          /> : undefined
        }
      >
        {user && following.length ? (
          <div className="flex flex-col gap-3">
            {following.map(user => (
              <Profile
                key={user.id}
                sideBarStatus={isSidebarActive}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div>
            {user ? (
              <div
                className="flex flex-col items-center gap-1 text-blue-900"
              >
                <PlugsConnected size={30} />

                <p className={classNames("text-center text-sm font-medium leading-tight whitespace-nowrap",
                  !isSidebarActive && "hidden"
                )}>
                  Comece a seguir outros <br /> usuários!
                </p>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="flex flex-col items-center gap-1 w-full text-blue-900"
              >
                <SignIn size={26} />

                <p className={classNames("text-center text-sm font-medium leading-tight whitespace-nowrap",
                  !isSidebarActive && "hidden"
                )}>
                  Entre para começar a seguir <br /> outros usuários!
                </p>
              </button>
            )}
          </div>
        )}
      </ListCard>

      {/* Card of recommended users */}
      <ListCard
        sideBarStatus={isSidebarActive}
        cardTitle="Perfis recomendados"
        icon={
          <ThumbsUp
            className = "min-w-[24px] min-h-[24px] text-gray-400"
            weight = "bold"
            size = { 24 }
          />
        }
      >
        {/* {recommendedUsers.map(user => (
          <Profile
            key={user.id}
            sideBarStatus={isSidebarActive}
            user={user}
            likesInWeek={2134}
          />
        ))} */}
      </ListCard>
    </main>
  </aside>
)
}