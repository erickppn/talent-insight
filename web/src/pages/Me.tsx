import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/Auth/AuthContext"

export function Me() {
  const { user, profile } = useContext(AuthContext);

  return (
    <main className="p-3 dark:text-zinc-400">
      <div className="rounded-md border-emerald-500 p-2 w-[600px] border-[1px]">
        <h2 className="mb-2"><span className="font-bold">Informações da conta - (id)</span> {user?.id}</h2>
        <div><span className="font-bold">Nome:</span> {user?.name}</div>
        <div><span className="font-bold">E-mail:</span> {user?.email}</div>
        <div><span className="font-bold">Idade:</span> {user?.age}</div>
        <div><span className="font-bold">E-mail verificado/Conta ativa?</span> {user?.isActive ? 'Sim' : 'Não'}</div>
      </div>

      <div className="rounded-md border-cyan-500 p-2 my-4 w-[600px] border-[1px]">
        <h2 className="font-bold mb-2">Informações do perfil</h2>
        <div><span className="font-bold">Nome Artístico:</span> {profile?.artName}</div>
        <div className="flex flex-col"><span className="font-bold">Sobre Mim:</span> {profile?.aboutMe}</div>
      </div>

      <Link to="/" className="text-blue-400 underline">Voltar</Link>
    </main>
  )
}