import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";

//pages imports
import { Home } from "../pages/Home";
import { Me } from "../pages/Me";
import { Configurations } from "../pages/Configurations";
import { EditProfile } from "../pages/Configurations/EditProfile";
import { EditAccount } from "../pages/Configurations/EditAccount";
import { DangerArea } from "../pages/Configurations/DangerArea";
import { Post } from "../pages/Post";
import { Results } from "../pages/Results";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>

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

      <Route path="search=:categoriesInUrl" element={<Results /> }/>

      <Route path="post/:id" element={<Post />} />

      <Route path="*" element={<h1>Página não encontrada</h1>}/>
    </Routes>
  )
}