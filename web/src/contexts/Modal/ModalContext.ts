import { createContext } from "react";

export type ModalContextType = {
  isOpen: boolean,
  openLogin: () => void,
  openRegister: () => void,
  closeModal: () => void,
  modalContent: 'signInUser' | 'registerUser',
}

export const ModalContext = createContext<ModalContextType>(null!);