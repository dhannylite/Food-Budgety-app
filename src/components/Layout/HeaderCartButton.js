import React from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import { useContext, useState, useEffect } from 'react'
import CartContext from '../../store/cart-context'


export default function HeaderCartButton(props) {
  const cartctx = useContext(CartContext)
  const [bumpBtn, setBumpBtn] = useState(false)
  // console.log(cartctx.items)
  const { items } = cartctx
  const btnClasses = `${classes.button} ${bumpBtn ? classes.bump : ''}`
  useEffect(() => {
    // console.log(2)
    if (items.length === 0) {
      return
    }
    const timer = setTimeout(() => {
      // console.log(4)
      setBumpBtn(false)
    }, 300);
    setBumpBtn(true)
    console.log(3)
    return () => {
      // console.log(5)
      clearTimeout(timer)
    }
  }, [items])
  
  console.log(1)
  const numberOfCartItems = cartctx.items.reduce((prevAmount, item) => {
    return prevAmount + item.amount
  }, 0)
  return (
      <button className={btnClasses} onClick={props.onClick}>
          <span className={classes.icon}>
              <CartIcon />
          </span>
          <span>Your Cart</span>
          <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}
