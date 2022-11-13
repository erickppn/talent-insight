import { useRef, useState } from "react";
import { Key } from "phosphor-react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeleteAccountForm } from "./DeleteAccountForm";

export function DangerArea() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentPasswordInput = useRef<HTMLInputElement | null>(null);

  function handleCurrentPasswordInputFocus() {
    if (currentPasswordInput.current) currentPasswordInput.current.focus();
  }
  
  return (
    <div className="flex flex-col items-center w-full py-6">
      <div className="w-[756px]">
        <h2 className="mb-6 text-xl text-rose-500 font-medium">Danger Area</h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 flex-1 p-4 py-5 bg-slate-50 rounded-md">
            <label 
              className="flex items-center gap-2 text-zinc-600 font-medium"
              htmlFor="userPassword"
            >
              Sua senha atual <span className="text-xs text-zinc-400">(obrigatória para qualquer ação nesta página)</span>

              {errorMessage && <span className="text-xs text-rose-400">{errorMessage}</span> }
            </label>

            <div className="flex items-center border-[1px] border-rose-400  rounded-md">
              <Key
                className="mx-3 text-zinc-600" 
                size={24}
              />
            
              <input 
                className="w-full p-3 bg-transparent border-l-[1px] border-rose-400 text-sm"
                type="password" 
                name="userPassword" 
                id="userPassword" 
                ref={currentPasswordInput}
                placeholder="**********************" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <ChangePasswordForm 
            currentPassword={currentPassword} 
            setCurrentPassword={setCurrentPassword}
            handleCurrentPasswordInputFocus={handleCurrentPasswordInputFocus}
            setErrorMessage={setErrorMessage}
          /> 

          <DeleteAccountForm 
            currentPassword={currentPassword} 
            handleCurrentPasswordInputFocus={handleCurrentPasswordInputFocus}
          /> 
        </div>
      </div>
    </div>
  )
}