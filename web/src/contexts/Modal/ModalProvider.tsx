import { useState } from "react";
import { ModalContext } from "./ModalContext";

export function ModalProvider({ children }: { children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'signInUser' | 'registerUser' | 'sendPost'>(null!);

  function openLogin() {
    setModalContent("signInUser");
    setIsOpen(true);
  }

  function openRegister() {
    setModalContent("registerUser");
    setIsOpen(true);
  }

  function openSendPost() {
    setModalContent("sendPost")
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{
      isOpen,
      openLogin,
      openRegister,
      openSendPost, 
      closeModal,
      modalContent,
    }}>
      {children}
    </ModalContext.Provider>
  )
}