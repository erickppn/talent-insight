import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Title } from "@radix-ui/react-dialog";
import classNames from "classnames";

import { Eye, EyeSlash, HandWaving, WarningCircle } from "phosphor-react";

import { Loading } from "../Loading";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";

import logo from "../../assets/logo.png";

interface ISignInForm {
  email: string,
  password: string,
}

export function SignInUser() {
  //Form Inputs
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignInForm>();
  const [showPassword, setShowPassword] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const { toggleLoginModal, toggleRegisterModal } = useContext(ModalContext);
  const { signin } = useContext(AuthContext);

  async function handleLogin(data: ISignInForm) {
    const { email, password } = data;

    setIsLoggingIn(true);

    const response = await signin(email, password);

    setIsLoggingIn(false);

    if (response) {
      return setApiErrorMessage(response);
    }

    toggleLoginModal();
  }

  function goToRegister() {
    toggleLoginModal();
    toggleRegisterModal();
  }

  return (
    <div className=" flex justify-center items-center px-16">
      <div className="w-32 flex justify-center mr-16">
        <img src={logo} alt="Logo do site" />
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex-1 flex flex-col justify-center h-full pl-10 py-8 border-l-[2px]"
      >
        <div className="mb-6">
          <Title className="mb-2 text-3xl font-semibold text-gray-900">
            Login
          </Title>

          {apiErrorMessage ? (
            //Error message
            <span className="flex items-center gap-2 text-sm font-semibold text-rose-400">
              <WarningCircle size={22} weight="bold" /> {apiErrorMessage}
            </span>
          ) : (
            <span className="flex items-center gap-2 font-semibold text-gray-900">
              Bem-vindo de volta <HandWaving size={22} weight="regular" />
            </span>
          )}
        </div>

        <div className="flex flex-col mb-3">
          <label className="mb-2 pl-4 text-xs font-medium text-gray-900" htmlFor="email-input">
            Seu login
          </label>

          <input
            id="email-input"
            type="email"
            placeholder="Email ou nome de usuário"
            className={classNames("w-[342px] py-2 px-4 bg-gray-100 border rounded-md text-black dark:bg-zinc-800 placeholder:text-gray-600", 
              errors.email ? "border-rose-400" : "border-gray-300"
            )}

            {... register("email", {
              required: {
                message: "O email é obrigatório",
                value: true,
              },
            })}
          />

          {errors.email && <span className="mt-1 ml-4 text-xs font-semibold text-rose-400">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col mb-3">
          <label className="mb-2 pl-4 text-xs font-medium text-gray-900" htmlFor="password-input">
            Senha
          </label>

          <div className={classNames(
            "flex justify-between items-center w-[342px] pr-2 bg-gray-100 border rounded-md text-black dark:bg-zinc-800", 
              errors.password ? "border-rose-400" : "border-gray-300"
          )}>
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="w-full h-full py-2 px-4 bg-transparent rounded-md placeholder:text-gray-600"

              {...register("password", {
                required: {
                  message: "A senha é obrigatória",
                  value: true
                }, 
              })}
            />

            <button 
              type="button" 
              className="text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword 
                ? <EyeSlash size={24} weight="bold" />
                : <Eye size={24} weight="bold" />
              }
            </button>
          </div>
          
          {errors.password && <span className="mt-1 ml-4 text-xs font-semibold text-rose-400">{errors.password.message}</span>}
        </div>

        <span
          className="mb-8 text-xs font-medium text-blue-500 hover:text-blue-400 active:text-blue-600"
        >
          Não lembra a senha?
        </span>

        <button
          type="submit"
          className="flex justify-center w-full mb-4 p-2 border-[1px] rounded-md font-medium bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400 transition-all duration-400"
        >
          {isLoggingIn ? <Loading /> : 'Entrar'}
        </button>

        <span className="text-center text-xs font-medium">
          Não possui conta?
          <button
            onClick={goToRegister}
            className="ml-1 text-blue-500 hover:text-blue-400 active:text-blue-600"
          >
            Registre-se agora
          </button>
        </span>
      </form>
    </div>
  )
}