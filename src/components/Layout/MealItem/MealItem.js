import React, {useContext} from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

export default function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  const cartctx = useContext(CartContext)
  function addItemHandler(amount) {
    cartctx.addItems({
      id: props.id,
      name: props.name,
      amount:amount,
      description: props.description,
      price:props.price
    })
  }
  return (
    <>
    <li className={classes.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
          </div>
          <div>
        <MealItemForm id={props.id} onAddItem={addItemHandler}/>
          </div>
    </li>
    </>
  );
}
