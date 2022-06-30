import React, {useRef} from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

export default function MealItemForm(props) {
  const amountRef = useRef()
  function submitHandler(event) {
    event.preventDefault()
    const amount = amountRef.current.value
    const amountNumber = +amount
    if (amount.trim().length === 0 || amountNumber > 5 || amountNumber < 1) {
      return
    }
    props.onAddItem(amountNumber)
  }
  return (
      <form className={classes.form} onSubmit={submitHandler}>
          <Input label='Amount'
                ref={amountRef}
                input={{
                  id: 'amount' + props.id,
                  type: 'number',
                  min: '1',
                  max: '5',
                  step: '1',
                  defaultValue: '1'
              }}/>
          <button>+ Add</button>
    </form>
  )
}
