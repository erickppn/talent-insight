import { FormEvent, useState } from "react";
import { Key, Password } from "phosphor-react";
import { Loading } from "../../../components/Loading";
import classNames from "classnames";
import { useApi } from "../../../hooks/useApi";

interface DeleteAccountFormProps {
  currentPassword: string,
  setCurrentPassword: (password: string) => void,
  handleCurrentPasswordInputFocus: () => void,
  setErrorMessage: (message: string) => void,
}

export function ChangePasswordForm({currentPassword, setCurrentPassword, handleCurrentPasswordInputFocus, setErrorMessage}: DeleteAccountFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSavingInfo, setIsSavingInfo] = useState(false);

  const { changeUserPassword } = useApi();

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();

    if (!currentPassword) {
      return handleCurrentPasswordInputFocus();
    }

    setIsSavingInfo(true);
    
    const response  = await changeUserPassword(currentPassword, newPassword);

    if (response.error) {
      setIsSavingInfo(false);
      return setErrorMessage(response.message);
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");

    setIsSavingInfo(false);
  }
  
  return (
    <form 
      className="flex flex-col gap-6"
      onSubmit={handleChangePassword}
    >
      <div className="flex flex-col gap-3 p-4 py-5 bg-slate-50 rounded-md">
        <label 
          className="flex items-center gap-2 text-zinc-600 font-medium"
          htmlFor="newPassword"
        >
          Sua nova senha 

          <span 
            className={classNames("text-xs text-rose-600 transition-opacity", 
              newPassword != confirmNewPassword || newPassword.length > 0 && newPassword.length < 8 ? "opacity-100": "opacity-0")
          }>
            {
              newPassword != confirmNewPassword ? "as senhas não coincidem" : "a nova senha deve conter pelo menos 8 dígitos"
            }
          </span>
        </label>
        
        <div className="flex items-center border-[1px] border-rose-400  rounded-md">
          <Key
            className="mx-3 text-zinc-600" 
            size={24}
          />
          
          <input 
            className="w-full p-3 bg-transparent border-l-[1px] border-rose-400 text-sm"
            type="password" 
            name="newPassword" 
            id="newPassword"
            placeholder="**********************"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        
        <label 
          className="mt-6 text-zinc-600 font-medium"
          htmlFor="confirmNewPassword"
        >
          Confirme sua nova senha
        </label>
        
        <div className="flex items-center border-[1px] border-rose-400  rounded-md">
          <Key
            className="mx-3 text-zinc-600" 
            size={24}
          />
          
          <input 
            className="w-full p-3 bg-transparent border-l-[1px] border-rose-400 text-sm"
            type="password" 
            name="confirmNewPassword" 
            id="confirmNewPassword"
            placeholder="**********************"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button 
        disabled={isSavingInfo || newPassword !== confirmNewPassword || newPassword.length < 8}
        className="flex justify-center items-center w-32 py-2 rounded-md border-[1px] border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white active:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed"
        type="submit" 
      >
        {isSavingInfo ? <Loading /> : "Salvar"}
      </button>
    </form>
  )
}