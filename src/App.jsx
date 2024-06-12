import CartModal from "./components/cart/modal";
import CheckoutForm from "./components/checkout/form";
import Header from "./components/header";
import MealsList from "./components/meals";

import CartContextProvider from "./contexts/cart-context";
import UserProgressContextProvider from "./contexts/user-progress-context";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <MealsList />
        <CartModal />
        <CheckoutForm />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
