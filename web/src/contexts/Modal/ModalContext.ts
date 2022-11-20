import { createContext } from "react";

export type ModalContextType = {
  isOpen: boolean,
  openLogin: () => void,
  openRegister: () => void,
  openSendPost: () => void, 
  closeModal: () => void,
  modalContent: 'signInUser' | 'registerUser' | 'sendPost',
}

export const ModalContext = createContext<ModalContextType>(null!);