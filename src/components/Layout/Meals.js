import React, { useContext } from 'react'
import CartContext from '../../store/cart-context'
import AvailableMeals from './AvailableMeals'
import MealsSummary from './MealSummary'


export default function Meals() {
  return (
      <>
          <MealsSummary />
          <AvailableMeals />
      </>
  )
}
