import { useContext } from "react";
import { ModalContext } from "../../contexts/Modal/ModalContext";

export function LoginOptions() {
  const { openRegister, openLogin } = useContext(ModalContext);
  
  return (
    <>
      <button 
        className="text-red-300 border-[1px] border-red-300 py-1 px-3 rounded-md hover:bg-red-300 hover:text-white active:bg-red-400 transition-colors"
        onClick={openLogin}
      >
        Entrar
      </button>

      <button 
        className="text-white bg-red-300 border-[1px] border-red-300 py-1 px-3 rounded-md hover:bg-transparent hover:text-red-300 active:bg-red-400 active:text-white transition-colors"
        onClick={openRegister}
      >
        Cadastrar-se
      </button>
    </>
  )
}