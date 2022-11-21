import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { ModalContext } from "../../../contexts/Modal/ModalContext";
import { Loading } from "../../Loading";

import logo from "../../../assets/logo.png";

export function SignInUser() {
  //form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { openRegister, closeModal } = useContext(ModalContext);
  const { signin } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);

    const response = await signin(email, password);

    setIsLoggingIn(false);

    if (response) {
      return setErrorMessage(response);
    }

    closeModal();
  }

  return (
    <div className=" flex justify-center items-center p-8 pr-10">
      <div className="w-28 bg-cover bg-center flex justify-center">
        <img src={logo} alt="Logo do site" />
      </div>

      <form 
        onSubmit={handleLogin} 
        className="flex-1 flex flex-col justify-center gap-4 h-full ml-6 pl-8 border-l-[1px]"
      >
        <div className="flex items-center">
          <span className="text-lg font-semibold">Fazer Login</span>

          <span className={"text-xs text-red-500 ml-3"}>
            {errorMessage}
          </span>
        </div>

        <div className="flex flex-col">
          <label>
            Email
          </label>

          <input 
            className="border-b-[1px] w-56 p-[2px] my-1 border-b-red-400 dark:bg-zinc-800"
            type="email" 
            placeholder="exemplo@email.com" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>
            Senha
          </label>

          <input 
            className="border-b-[1px] w-56 p-[2px] my-1 border-b-red-400 dark:bg-zinc-800"
            type="password" 
            placeholder="***********" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={ email.length === 0 || password.length === 0 || isLoggingIn }
          className="flex justify-center w-[120px] my-2 p-1 border-red-400 border-[1px] rounded text-red-400 hover:bg-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-red-400 transition-all duration-400"
        >
          {isLoggingIn ? <Loading /> : 'Login'}
        </button>

        <span className="text-xs">
          Não possui conta? 
          <button onClick={openRegister} className=" text-blue-500 underline ml-1 hover:text-blue-400 active:text-blue-600">
            Registre-se agora
          </button>
        </span>
      </form>
    </div>
  )
}