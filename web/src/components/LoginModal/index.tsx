import { Fragment, useContext } from "react";
import { Transition, Dialog } from "@headlessui/react";

import { ThemeContext } from "../../contexts/Theme/ThemeContext";
import { ModalContext } from "../../contexts/Modal/ModalContext";

import { SignInUser } from "./Content/SignInUser";
import { RegisterUser } from "./Content/RegisterUser";
import classNames from "classnames";

export function Modal() {
  const { darkTheme } = useContext(ThemeContext);
  const { isOpen, closeModal, modalContent } = useContext(ModalContext);

  return (
    <Transition appear show={isOpen}>
      <Dialog onClose={closeModal} >
        <div className={classNames("flex justify-center items-center absolute inset-0 bg-black bg-opacity-5",
          { "dark": darkTheme }
        )}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="dark:bg-zinc-800 bg-white rounded-lg shadow-lg">
              { 
                modalContent == "signInUser" ? (
                  <SignInUser />
                ) : (
                  <RegisterUser />
                )
              }
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}