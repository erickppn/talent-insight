import { createContext } from "react";

export type ModalContextType = {
  isOpenLoginModal: boolean, 
  toggleLoginModal: () => void,
  isOpenRegisterModal: boolean,
  toggleRegisterModal: () => void,
  isAnyOpenModal: boolean
}

export const ModalContext = createContext<ModalContextType>(null!);