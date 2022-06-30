import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

function isEmpty(value) {
    return value.trim() === ''
}

function isFiveChar(value) {
    return value.trim().length !== 5
}

const Checkout = (props) => {
    const [validity, setValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })
    const nameRef = useRef()
    const streetRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()

  const confirmHandler = (event) => {
      event.preventDefault();
      const enteredName = nameRef.current.value
      const enteredStreet = streetRef.current.value
      const enteredCity = cityRef.current.value
      const enteredPostal = postalRef.current.value

      const nameisValid = !isEmpty(enteredName)
      const streetisValid = !isEmpty(enteredStreet)
      const cityisValid = !isEmpty(enteredCity)
      const postalisValid = !isFiveChar(enteredPostal)
      console.log(enteredName)

      setValidity(
         { name: nameisValid,
          street: streetisValid,
          city: cityisValid,
          postal: postalisValid}
      )
      const formIsValid = nameisValid && streetisValid && cityisValid && postalisValid 

      
      if (!formIsValid) {
          return
      }
      props.onConfirm({
          name: enteredName,
          street: enteredStreet,
          city: enteredCity,
          postal: enteredPostal
      })
    };
    
    console.log(validity.name)
    const nameClasses = `${classes.control} ${validity.name ? '' : classes.invalid}`
    const streetClasses = `${classes.control} ${validity.street ? '' : classes.invalid}`
    const cityClasses = `${classes.control} ${validity.city ? '' : classes.invalid}`
    const postalClasses = `${classes.control} ${validity.postal ? '' : classes.invalid}`
    

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
              <input type='text' id='name' ref={nameRef} />
              {!validity.name && <p>Enter valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
              <input type='text' id='street' ref={streetRef} />
              {!validity.street && <p>Enter valid street</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
              <input type='text' id='postal' ref={postalRef} />
              {!validity.postal && <p>Enter valid postal</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
              <input type='text' id='city' ref={cityRef} />
              {!validity.city && <p>Enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;