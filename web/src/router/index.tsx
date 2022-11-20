import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";

//pages imports
import { Me } from "../pages/Me";
import { Configurations } from "../pages/Configurations";
import { EditProfile } from "../pages/Configurations/EditProfile";
import { EditAccount } from "../pages/Configurations/EditAccount";
import { DangerArea } from "../pages/Configurations/DangerArea";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="p-3">
          <div className="flex justify-between flex-col h-[3000px] dark:text-zinc-100 border-2">
            <header>Começo da página</header>
            <footer>Fim da página</footer>
          </div>
        </div>
      }/>
      
      <Route path="@me" element={
        <RequireAuth>
          <Me />
        </RequireAuth>
      }/>

      <Route path="configurations" element={<Configurations />}>
        <Route index element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }/>

        <Route path="profile" element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }/>

        <Route path="account" element={
          <RequireAuth>
            <EditAccount />
          </RequireAuth>
        }/>

        <Route path="danger" element={
          <RequireAuth>
            <DangerArea />
          </RequireAuth>
        }/>
      </Route>

      <Route path="*" element={<h1>Página não encontrada</h1>}/>
    </Routes>
  )
}