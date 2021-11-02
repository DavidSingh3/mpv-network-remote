import classes from './Modal.module.scss'
import { ReactElement } from 'react'
import { MdClose } from 'react-icons/md'

function Modal (props: {
  title: string,
  children: ReactElement,
  closeCallback: () => void,
}) {
  return <div className={classes.modal}>
    <div className={classes.header}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.closeButtonContainer}>
        <MdClose onClick={props.closeCallback}/>
      </div>
    </div>
    <div className={classes.body}>{props.children}</div>
  </div>
}

export default Modal
