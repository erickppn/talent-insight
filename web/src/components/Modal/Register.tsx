import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { Title } from "@radix-ui/react-dialog";
import classNames from "classnames";

import { WarningCircle, Eye, EyeSlash, PaintBrush } from "phosphor-react";

import { Loading } from "../Loading";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";

import logo from "../../assets/logo.png";

interface IRegisterForm {
  name: string, 
  email: string,
  password: string,
  confirmPassword: string,
  birhDate: Date,
}

export function RegisterUser() {
  //Form Inputs
  const { register: registerInput, handleSubmit, watch, formState: { errors } } = useForm<IRegisterForm>();
  const watchPassword = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const { toggleRegisterModal, toggleLoginModal } = useContext(ModalContext);
  const { register } = useContext(AuthContext);

  async function handleRegister(data: IRegisterForm) {
    const { name, email, password, confirmPassword, birhDate } = data;

    setIsRegistering(true);

    const response = await register(name, email, password, confirmPassword, birhDate);

    setIsRegistering(false);

    if (response) {
      return setApiErrorMessage(response);
    }

    toggleRegisterModal();
  }

  function goToLogin() {
    toggleLoginModal();
    toggleRegisterModal();
  }
  
  return (
    <div className=" flex justify-center items-center px-16">
      <div className="w-32 flex justify-center mr-16">
        <img src={logo} alt="Logo do site" />
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)} 
        className="flex-1 flex flex-col justify-center h-full pl-10 py-8 border-l-[2px]"
      >
        <div className="mb-6">
          <Title className="mb-2 text-3xl font-semibold text-gray-900">
            Cadastro
          </Title>

          {apiErrorMessage ? (
            //Error message
            <span className="flex items-center gap-2 text-sm font-semibold text-rose-400">
              <WarningCircle size={22} weight="bold" /> {apiErrorMessage}
            </span>
          ) : (
            <span className="flex items-center gap-2 font-semibold text-gray-900 whitespace-nowrap">
              Mostre ao mundo o que mais gosta de fazer <PaintBrush className="min-w-[22px]" size={22} weight="regular" />
            </span>
          )}
        </div>

        <div className="flex flex-col mb-3">
          <label className="mb-2 pl-4 text-xs font-medium text-gray-900" htmlFor="name-input">
            Seu nome
          </label>

          <input 
            id="name-input"
            type="text" 
            placeholder="Joe Doe" 
            className={classNames("w-[342px] py-2 px-4 bg-gray-100 border rounded-md text-black dark:bg-zinc-800 placeholder:text-gray-600", 
              errors.name ? "border-rose-400" : "border-gray-300"
            )}

            {... registerInput("name", {
              required: {
                message: "O seu nome é obrigatório",
                value: true,
              },
            })}
          />

          {errors.name && <span className="mt-1 ml-4 text-xs font-semibold text-rose-400">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col mb-3">
          <label className="mb-2 pl-4 text-xs font-medium text-gray-900" htmlFor="email-input">
            Seu email
          </label>

          <input
            id="email-input"
            type="email"
            placeholder="Email ou nome de usuário"
            className={classNames("w-[342px] py-2 px-4 bg-gray-100 border rounded-md text-black dark:bg-zinc-800 placeholder:text-gray-600", 
              errors.email ? "border-rose-400" : "border-gray-300"
            )}
            
            {... registerInput("email", {
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

              {...registerInput("password", {
                required: {
                  message: "A senha é obrigatória",
                  value: true
                }, 
                minLength: {
                  message: "A senha precisa ter pelo menos 8 caracteres",
                  value: 8,
                }
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

        <div className="flex flex-col mb-3">
          <label className="mb-2 pl-4 text-xs font-medium text-gray-900" htmlFor="password-confirm-input">
            Confirmação de senha
          </label>

          <input
            id="password-confirm-input"
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            className={classNames("w-[342px] py-2 px-4 bg-gray-100 border rounded-md text-black dark:bg-zinc-800 placeholder:text-gray-600", 
              errors.confirmPassword? "border-rose-400" : "border-gray-300",
            )}

            {...registerInput("confirmPassword", {
              required: {
                message: "A senha de confirmação é obrigatória",
                value: true
              }, 
              validate: (value) => value === watchPassword || "As senhas não conferem",
            })}
          />

          {errors.confirmPassword && <span className="mt-1 ml-4 text-xs font-semibold text-rose-400">{errors.confirmPassword.message}</span>}
        </div>

        <div className="flex flex-col mb-8">
          <label className="mb-2 pl-4 text-xs font-medium text-gray-900" htmlFor="birth-date-input">
            Data do seu aniversário
          </label>

          <input 
            id="birth-date-input"
            type="date" 
            className={classNames("w-[342px] py-2 px-4 bg-gray-100 border rounded-md text-black dark:bg-zinc-800 placeholder:text-gray-600", 
              errors.birhDate ? "border-rose-400" : "border-gray-300"
            )}
            
            {...registerInput("birhDate", {
              required: {
                message: "Você precisa informar sua data de nascimento",
                value: true,
              },
              valueAsDate: true
            })}
          />

          {errors.birhDate && <span className="mt-1 ml-4 text-xs font-semibold text-rose-400">{errors.birhDate.message}</span>}
        </div>

        <button 
          type="submit" 
          className="flex justify-center w-full mb-4 p-2 border-[1px] rounded-md font-medium bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400 transition-all duration-400"
        >
          {isRegistering ? <Loading /> : "Registrar"}
        </button>

        <span className="text-center text-xs font-medium">
          Já possui conta?
          <button
            onClick={goToLogin}
            className="ml-1 text-blue-500 hover:text-blue-400 active:text-blue-600"
          >
            Faça login
          </button>
        </span>
      </form>
    </div>
  )
}