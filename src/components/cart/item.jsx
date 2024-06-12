import { useContext } from "react";

import { CartContext } from "../../contexts/cart-context";

import { currencyFormatter } from "../../helpers/formatter";

export default function CartItem(item) {
  const { name, quantity, price, id } = item;
  const { addItem, removeItem } = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => removeItem(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => addItem(item)}>+</button>
      </p>
    </li>
  );
}
