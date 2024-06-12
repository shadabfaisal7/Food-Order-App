import { useContext } from "react";

import { CartContext } from "../../contexts/cart-context";

import Button from "../UI/button";

import { currencyFormatter } from "../../helpers/formatter";
import { API_BASE_URL } from "../../constants/api-endpoints";

export default function MealItem(meal) {
  const { image, price, name, description, id } = meal;
  const { addItem, removeItem } = useContext(CartContext);

  const addToCartHandler = () => {
    addItem(meal);
  };

  const removeFromCartHandler = () => {
    removeItem(id);
  };

  const formattedPrice = currencyFormatter.format(price);
  return (
    <li className="meal-item">
      <article>
        <img src={`${API_BASE_URL}/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={addToCartHandler}>Add to Cart</Button>
        </p>

        <p className="meal-item-actions">
          <Button onClick={removeFromCartHandler}>Remove from Cart</Button>
        </p>
      </article>
    </li>
  );
}
