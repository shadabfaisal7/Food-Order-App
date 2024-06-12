import { useContext } from "react";

import Modal from "../UI/modal";
import Button from "../UI/button";
import CartItem from "./item";

import { UserProgressContext } from "../../contexts/user-progress-context";
import { CartContext } from "../../contexts/cart-context";

import { currencyFormatter } from "../../helpers/formatter";

import { CART } from "../../constants/modal";

const CartModal = () => {
  const { totalCartPrice, items } = useContext(CartContext);
  const { closeModal, show, showCheckout } = useContext(UserProgressContext);

  const formatterTotalPrice = currencyFormatter.format(totalCartPrice);

  const isShowCart = show === CART;
  return (
    <Modal
      className="cart"
      isOpen={isShowCart}
      onClose={isShowCart ? closeModal : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
      <p className="cart-total">{formatterTotalPrice}</p>
      <p className="modal-actions">
        <Button textOnly onClick={closeModal}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default CartModal;
