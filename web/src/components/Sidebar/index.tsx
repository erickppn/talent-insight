import { useContext, useEffect, useState } from "react";

import classNames from "classnames";
import { PlugsConnected, SignIn, ThumbsUp, Trophy, Users } from "phosphor-react";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";
import { SidebarContext } from "../../contexts/Sidebar/SidebarProvider";

import { Menu } from "./Menu";
import { Card } from "./Card";
import { Profile } from "./Profile";

import { useApi } from "../../hooks/useApi";

import { PublicUserInfo } from "../../types/User";

export function Sidebar() {
  const [topRatedUsers, setTopRatedUsers] = useState<PublicUserInfo[]>([]);

  const { user, following } = useContext(AuthContext);
  const { toggleLoginModal } = useContext(ModalContext);
  const { sidebarIsExpanded } = useContext(SidebarContext);

  const { getUsersByRating } = useApi();

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
    <aside className={classNames(
      "flex flex-col p-6 overflow-y-auto scrollbar-none transition-all ease-out duration-500 overflow-hidden",
      sidebarIsExpanded ? "w-72" : "w-28"
    )}>
      <Menu />

      <main className="flex flex-col gap-6">
        <Card.Root>
          <Card.Header>
            <Card.Icon icon={Trophy} weight="fill" className="text-amber-500" />
            <Card.Title title="Talentos conhecidos" />
          </Card.Header>

          <Card.Content>
            {topRatedUsers.map(user => (
              <Profile
                key={user.id}
                user={user}
                likesInWeek={2134}
                viewsInWeek={12321}
              />
            ))}
          </Card.Content>
        </Card.Root>

        {user && following.length ? (
          <Card.Root>
            <Card.Header>
              <Card.Icon icon={Users} weight="regular" className="text-gray-400" />
              <Card.Title title="Seguindo" />
            </Card.Header>

            <Card.Content>
              {
                following.map(user => (
                  < Profile key={user.id} user={user} />
                ))
              }
            </Card.Content>
          </Card.Root>
        ) : (
          <>
            {user ? (
              <Card.Root>
                <Card.Content>
                  <div className="flex flex-col items-center gap-1 text-blue-900">
                    <PlugsConnected size={30} />

                    <p className={classNames("text-center text-sm font-medium leading-tight whitespace-nowrap",
                      !sidebarIsExpanded && "hidden"
                    )}>
                      Comece a seguir outros <br /> usuários!
                    </p>
                  </div>
                </Card.Content>
              </Card.Root>
            ) : (
              <Card.Root>
                <Card.Content>
                  <button
                    onClick={toggleLoginModal}
                    className="flex flex-col items-center gap-1 w-full text-blue-900"
                  >
                    <SignIn size={26} />

                    <p className={classNames("text-center text-sm font-medium leading-tight whitespace-nowrap",
                      !sidebarIsExpanded && "hidden"
                    )}>
                      Entre para começar a seguir <br /> outros usuários!
                    </p>
                  </button>
                </Card.Content>
              </Card.Root>
            )}
          </>
        )}

        <Card.Root>
          <Card.Header>
            <Card.Icon icon={ThumbsUp} weight="bold" className="text-gray-400" />
            <Card.Title title="Perfis recomendados" />
          </Card.Header>

          <Card.Content>
            {topRatedUsers.map(user => (
            <Profile
              key={user.id}
              user={user}
              likesInWeek={2134}
            />
          ))} 
          </Card.Content>
        </Card.Root>
      </main>
    </aside>
  )
}