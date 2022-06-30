import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartctx = useContext(CartContext);
  const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`
  const hideOrder = cartctx.items.length > 0
  console.log(6)
  function addItemHandler(item) {
    cartctx.addItems({...item, amount:1})
  }

  function removeItemHandler(id) {
    cartctx.removeItem(id)
  }

  function showCheckoutHandler() {
    setShowCheckout(true)
  }

  async function submitDataHandler(userData) {
    setIsSubmitting(true)
    await fetch('https://react-http-9eaad-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartctx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartctx.clear()
  }
  const cartItem = (
    <ul className={classes.list}>
      {cartctx.items.map((meal) => {
        return (
          <CartItem
            key={meal.id}
            name={meal.name}
            price={meal.price}
            amount={meal.amount}
            description={meal.description}
            onRemove={removeItemHandler.bind(null, meal.id)}
            onAdd={addItemHandler.bind(null, meal)}
          />
        );
      })}
    </ul>
  );
  const modalAction = <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.onClose}>
    Close
  </button>
  { hideOrder && <button onClick={showCheckoutHandler} className={classes.button}>Order</button>}
  </div>
  
  const modalContent = <>
    {cartItem}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onConfirm={submitDataHandler} onClose={props.onClose} />}
      {!showCheckout && modalAction}
  </>
  const isSubmit = <p>order being processed</p>
  const success = <p>Order Sucessful</p>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmit}
      {didSubmit && !isSubmitting && success}
    </Modal>
  );
}
