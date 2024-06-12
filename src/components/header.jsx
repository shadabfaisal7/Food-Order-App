import { useContext } from "react";

import { CartContext } from "../contexts/cart-context";
import { UserProgressContext } from "../contexts/user-progress-context";

import Button from "./UI/button";

import logoImg from "../assets/logo.jpg";

export default function Header() {
  const { totalCartItems } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>Meals App</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
