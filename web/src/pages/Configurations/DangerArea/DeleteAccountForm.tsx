import { FormEvent, useContext, useState } from "react";
import { ChatText, Play, Trash, UserCircle, Warning } from "phosphor-react";
import { useApi } from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Loading } from "../../../components/Loading";

interface DeleteAccountFormProps {
  currentPassword: string,
  handleCurrentPasswordInputFocus: () => void,
  setErrorMessage: (message: string) => void,
}

export function DeleteAccountForm({currentPassword, handleCurrentPasswordInputFocus, setErrorMessage}: DeleteAccountFormProps) {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const { deleteUserAccount } = useApi();
  const { signout } = useContext(AuthContext);

  async function hadleDeleteAccount(e: FormEvent) {
    e.preventDefault();
    
    if (!currentPassword) {
      return handleCurrentPasswordInputFocus();
    }
    
    setIsDeletingAccount(true);

    const response = await deleteUserAccount(currentPassword);

    if (!response.error) {
      signout();
    } else {
      setErrorMessage(response.message);
      handleCurrentPasswordInputFocus();
    }

    setIsDeletingAccount(false);
  }
  
  return (
    <form 
      onSubmit={hadleDeleteAccount}
      className="flex flex-col rounded-md overflow-hidden"
    >
      <div className="flex flex-col justify-center items-center gap-3 py-10 bg-zinc-50 border-b-[1px] border-b-zinc-400 text-red-500">
        <Warning size={46} weight="thin" />

        <span className="text-xl font-semibold">Deletar minha conta</span>
      </div>

      <div className="flex flex-col justify-center items-center gap-8 p-8 bg-slate-50">
        <div className="flex flex-col gap-4 w-[560px]">
          <span className="text-zinc-600 font-semibold">Cuidado: essa ação não pode ser desfeita.</span>

          <ul>
            <li className="flex items-center gap-3 text-zinc-500">
              <Play size={20}  className="text-red-500"/> Todos os seus posts (vídeos, imagens etc.) serão apagados
            </li>

            <li className="flex items-center gap-3 text-zinc-500">
              <ChatText size={20}  className="text-red-500"/> Todos os seus comentários serão apagados
            </li>

            <li className="flex items-center gap-3 text-zinc-500">
              <UserCircle size={20}  className="text-red-500"/> Todas as informações sobre você serão deletadas da plataforma
            </li>
          </ul>

          <span className="text-zinc-600">Tem certeza que deseja continuar?</span>
        </div>

        <button 
          type="submit"
          disabled={isDeletingAccount}
          className="flex justify-center items-center gap-2 w-[560px] py-2 px-6 bg-rose-500 border-[1px] border-transparent rounded-md text-white transition-colors hover:bg-transparent hover:border-rose-500 hover:text-rose-500 active:bg-rose-600 active:text-white disabled:opacity-60 disabled:bg-transparent disabled:border-rose-500 disabled:text-rose-500 disabled:cursor-not-allowed"
        >
          {isDeletingAccount ? <Loading /> : (
            <>
              <Trash size={20} /> Sim, delete tudo :(
            </>
          )}
        </button>
      </div>
    </form>
  )
}