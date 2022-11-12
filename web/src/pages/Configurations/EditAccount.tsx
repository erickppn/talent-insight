import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useApi } from "../../hooks/useApi";

import { Loading } from "../../components/Loading";

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
        <h2 className="mb-6 text-xl font-medium">Conta</h2>

        <form onSubmit={handleEditUser} className="bg-[#f3f3f3] rounded-md">
          <div className="flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-3 p-4 py-5 bg-slate-50 rounded-md">
              <label 
                className="text-zinc-600 font-medium"
                htmlFor="userName"
              >
                Seu nome
              </label>
              
              <input 
                className="px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md"
                type="text" 
                name="userName" 
                id="userName"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-3 p-4 py-5 bg-slate-50 rounded-md">
              <label 
                className="text-zinc-600 font-medium"
                htmlFor="userEmail"
              >
                E-mail
              </label>
              
              <input 
                className="px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md"
                type="text" 
                name="userEmail" 
                id="userEmail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-3 w-fit p-4 py-5 bg-slate-50 rounded-md">
                <label 
                  className="text-zinc-600 font-medium"
                  htmlFor="userAge"
                >
                  Sua idade
                </label>
                
                <input 
                  className="w-28 px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md"
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

              <div className="flex flex-col gap-3 flex-1 p-4 py-5 bg-slate-50 rounded-md">
                <label 
                  className="text-zinc-600 font-medium"
                  htmlFor="userPassword"
                >
                  Confirme sua senha para continuar
                </label>
                
                <input 
                  className="px-5 py-3 bg-transparent border-[1px] border-rose-400 text-sm rounded-md"
                  type="password" 
                  name="userPassword" 
                  id="userPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              className="flex justify-center items-center w-36 mt-4 py-1 rounded-md border-[1px] border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-500 disabled:cursor-not-allowed"
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