import { FormEvent, useContext, useState } from "react"
import classNames from "classnames";
import { At, CalendarBlank, Key, User } from "phosphor-react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useApi } from "../../../hooks/useApi";

import { Loading } from "../../../components/Loading";

export function EditAccount() {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState(user?.age);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSavingInfo, setIsSavingInfo] = useState(false);

  const { editUserAccount } = useApi();

  async function handleEditUser(e: FormEvent) {
    e.preventDefault();
    setIsSavingInfo(true);

    const newData = await editUserAccount(name, email, confirmPassword, age!);

    setUser(newData.newUserAccountInfo);
    setConfirmPassword("");
    setIsSavingInfo(false);
  }

  return (
    <div className="flex flex-col items-center w-full py-6">
      <div className="w-[756px]">
        <h2 className="mb-6 p-3 text-xl font-medium bg-rose-400 rounded-md text-white shadow-md">
          Conta
        </h2>

        <form onSubmit={handleEditUser}>
          <div className="flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-3 p-4 py-5 bg-slate-50 rounded-md shadow-md">
              <label 
                className="text-zinc-600 font-medium"
                htmlFor="userName"
              >
                Seu nome
              </label>
              
              <div className="flex items-center border-[1px] border-rose-400 rounded-md">
                <User
                  className="mx-3 text-zinc-600" 
                  size={24}
                />
                
                <input 
                  className="w-full p-3 bg-transparent border-l-[1px] border-rose-400 text-sm"
                  type="text" 
                  name="userName" 
                  id="userName"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4 py-5 bg-slate-50 rounded-md shadow-md">
              <label 
                className="flex items-center gap-2 text-zinc-600 font-medium"
                htmlFor="userEmail"
              >
                E-mail    

                <span 
                  className={classNames("text-xs text-rose-600 transition-opacity", 
                    email != user?.email ? "opacity-100": "opacity-0")
                }>
                  será necessário verificar seu novo e-mail
                </span>
              </label>

              <div className="flex items-center border-[1px] border-rose-400  rounded-md">
                <At
                  className="mx-3 text-zinc-600" 
                  size={24}
                />

                <input 
                  className="w-full p-3 bg-transparent border-l-[1px] border-rose-400 text-sm"
                  type="text" 
                  name="userEmail" 
                  id="userEmail"
                  placeholder="exemplo@email.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-3 w-fit p-4 py-5 bg-slate-50 rounded-md shadow-md">
                <label 
                  className="text-zinc-600 font-medium"
                  htmlFor="userAge"
                >
                  Sua idade
                </label>

                <div className="flex items-center border-[1px] border-rose-400 rounded-md">
                  <CalendarBlank
                    className="mx-3 text-zinc-600" 
                    size={22}
                  />
                  
                  <input 
                    className="w-14 p-3 bg-transparent border-l-[1px] border-rose-400 text-sm"
                    type="number" 
                    name="userAge" 
                    id="userAge"
                    min="1"
                    max="100"
                    value={age}
                    onChange={e => setAge(e.target.valueAsNumber)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1 p-4 py-5 bg-slate-50 rounded-md shadow-md">
                <label 
                  className="text-zinc-600 font-medium"
                  htmlFor="userPassword"
                >
                  Confirme sua senha para continuar
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
                    placeholder="**********************" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              className="flex justify-center items-center w-32 mt-4 py-2 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed"
              type="submit" 
            >
              {isSavingInfo ? <Loading /> : "Salvar"}
            </button>
          </div>
        </form> 
      </div>
    </div>
  )
}