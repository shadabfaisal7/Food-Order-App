import { createContext, useState } from "react";

import { CART, CHECKOUT } from "../constants/modal";

export const UserProgressContext = createContext({
  show: "",
  showCart: () => {},
  showCheckout: () => {},
  closeModal: () => {},
});

const UserProgressContextProvider = ({ children }) => {
  const [show, setShow] = useState("");

  const closeModal = () => {
    setShow("");
  };

  const showCart = () => {
    setShow(CART);
  };

  const showCheckout = () => {
    setShow(CHECKOUT);
  };

  const userProgessCtxValue = {
    show,
    showCart,
    showCheckout,
    closeModal,
  };

  return (
    <UserProgressContext.Provider value={userProgessCtxValue}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContextProvider;
