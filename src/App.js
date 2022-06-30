import { useContext, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Layout/Meals";
import CartContext from "./store/cart-context";
import CartProvider from "./store/CartProvider";

function App() {
  const cartctx = useContext(CartContext)
  const [showCart, setShowCart] = useState(false)
  function showCartHandler() {
    setShowCart(true)
  }
  function hideCartHandler() {
    setShowCart(false)
  }
  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
