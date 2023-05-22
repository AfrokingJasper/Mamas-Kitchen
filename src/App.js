import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCartHandler = () => {
    setCartVisible(false);
  };

  return (
    <CartProvider>
      {cartVisible && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
