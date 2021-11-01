import classes from './Modal.module.scss'
import { ReactElement } from 'react'

function Modal (props: {children: ReactElement}) {
  return <div className={classes.modal}>{props.children}</div>
}

export default Modal
