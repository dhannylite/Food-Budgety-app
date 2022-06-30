import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default function Modal(props) {
    const portalElement = document.getElementById('Overlays')
  return (
      <>
          {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
          {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </>
  )
}
