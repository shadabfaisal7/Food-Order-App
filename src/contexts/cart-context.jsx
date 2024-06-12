import { createContext, useMemo, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const cartReducerFn = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const updatedItems = [...state.items];

    if (existingCartItemIdx > -1) {
      const existingItem = state.items[existingCartItemIdx];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIdx] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIdx];
    let updatedItems = [...state.items];
    if (existingItem?.quantity === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem?.quantity - 1,
      };
      updatedItems[existingCartItemIdx] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
};

const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducerFn, {
    items: [],
  });

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", payload: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const totalCartItems = useMemo(
    () =>
      cartState.items.reduce((totalNumOfItems, currentItem) => {
        return totalNumOfItems + currentItem.quantity;
      }, 0),
    [cartState]
  );

  const totalCartPrice = useMemo(
    () =>
      cartState.items.reduce((total, currentItem) => {
        return total + currentItem.quantity * currentItem.price;
      }, 0),
    [cartState]
  );

  const cartContext = {
    items: cartState.items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    totalCartItems,
    totalCartPrice,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
