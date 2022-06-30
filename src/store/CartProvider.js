import React, {useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const updatedAmount = state.totalAmount + action.item.price * action.item.amount
    const existCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existCartItem = state.items[existCartItemIndex]
    let updatedItems
    if (existCartItem) {
      const updateItem = {
        ...existCartItem,
        amount: existCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existCartItemIndex] = updateItem
    }
    else {
      updatedItems = state.items.concat(action.item)
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount
    }
  }
  if (action.type === 'REMOVE') {
    const existCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existCartItem = state.items[existCartItemIndex]
    const updatedAmount = state.totalAmount - existCartItem.price
    console.log(updatedAmount)
    let updatedItems
    if (existCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {
        ...existCartItem,
        amount: existCartItem.amount-1
      }
      updatedItems = [...state.items]
      updatedItems[existCartItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }
  return defaultCartState
} 

// console.log(6)
export default function CartProvider(props) {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState)
    function addItemHandler(item) {
      dispatchCartState({
        type: 'ADD',
        item: item,
      })
    }
    function removeItemHandler(id) {
      dispatchCartState({
        type: 'REMOVE',
        id: id,
      })
  }
  
  function clearHandler() {
    dispatchCartState({
      type: 'CLEAR'
    })
  }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItems: addItemHandler,
      removeItem: removeItemHandler,
        clear: clearHandler
  }
  console.log(cartState.items)
  return (
      <CartContext.Provider value={cartContext}>
          {props.children}
    </CartContext.Provider>
  )
}
