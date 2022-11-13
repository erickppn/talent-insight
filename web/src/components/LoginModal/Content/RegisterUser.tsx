import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { ModalContext } from "../../../contexts/Modal/ModalContext"
import { Loading } from "../../Loading";

import logo from "../../../assets/logo.png";

export function RegisterUser() {
  //form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(17);
  const [errorMessage, setErrorMessage] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const { openLogin, closeModal } = useContext(ModalContext);
  const { register } = useContext(AuthContext);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setIsRegistering(true);

    const response = await register(name, email, password, confirmPassword, age);

    setIsRegistering(false);

    if (response) {
      return setErrorMessage(response);
    }

    closeModal();
  }
  
  return (
    <div className=" flex justify-center items-center p-8 pr-10">
      <div className="w-32 bg-cover bg-center flex justify-center">
        <img src={logo} alt="Logo do site" />
      </div>

      <form
        onSubmit={handleRegister} 
        className="flex-1 flex flex-col justify-center gap-4 h-full ml-6 pl-8 border-l-[1px]"
      >
        <div className="flex items-center mb-3">
          <span className="text-lg font-semibold">Fazer Cadastro</span>

          <span className={"text-xs text-red-500 ml-3"}>
            {errorMessage}
          </span>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col">
            <label>
              Seu nome
            </label>

            <input 
              className="border-b-[1px] w-56 p-[2px] border-b-red-400"
              type="text" 
              placeholder="Joe Doe" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>
              Email
            </label>

            <input 
              className="border-b-[1px] w-56 p-[2px] border-b-red-400"
              type="email" 
              placeholder="exemplo@email.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col">
            <label>
              Senha
            </label>
  
            <input 
              className="border-b-[1px] w-56 p-[2px] border-b-red-400"
              type="password" 
              placeholder="***********" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>
              Confirme sua senha
            </label>
  
            <input 
              className="border-b-[1px] w-56 p-[2px] border-b-red-400"
              type="password" 
              placeholder="***********" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label>Sua idade:</label>
          <input 
            className="border-b-[1px] w-10 p-[2px] ml-3 border-b-red-400"
            type="number" 
            min="1"
            max="100"
            placeholder="17" 
            value={age}
            onChange={e => setAge(e.target.valueAsNumber)}
          />
        </div>

        <button 
          type="submit" 
          disabled={ 
            name.length === 0 ||
            email.length === 0 || 
            password.length === 0 || 
            confirmPassword !== password ||
            isRegistering 
          }
          className="flex p-1 justify-center w-[120px] border-red-400 border-[1px] rounded text-red-400 hover:bg-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-red-400 transition-all duration-400"
        >
          {isRegistering ? <Loading /> : "Registrar"}
        </button>

        <span className="text-xs">
          Já possui uma conta?
          <button onClick={openLogin} className=" text-blue-500 underline ml-1 hover:text-blue-400 active:text-blue-600">
            Faça login
          </button>
        </span>
      </form>
    </div>
  )
}