import { useState } from "react";
import { ModalContext } from "./ModalContext";

export function ModalProvider({ children }: { children: JSX.Element }) {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  function toggleLoginModal() {
    setIsOpenLoginModal(!isOpenLoginModal);
  }

  function toggleRegisterModal() {
    setIsOpenRegisterModal(!isOpenRegisterModal);
  }

  return (
    <ModalContext.Provider value={{
      isOpenLoginModal,
      toggleLoginModal, 
      isOpenRegisterModal,
      toggleRegisterModal,
      isAnyOpenModal: isOpenLoginModal || isOpenRegisterModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}