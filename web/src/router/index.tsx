import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";

//pages imports
import { Me } from "../pages/Me";
import { MyConfig } from "../pages/MyConfig";
import { SendPost } from "../pages/SendPost";

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

      <Route path="/@me/send" element={
        <RequireAuth>
          <SendPost />
        </RequireAuth>
      }/>

      <Route path="/@me/config" element={
        <RequireAuth>
          <MyConfig />
        </RequireAuth>
      }/>

      <Route path="*" element={<h1>Página não encontrada</h1>}/>
    </Routes>
  )
}