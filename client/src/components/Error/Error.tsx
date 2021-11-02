import classes from './Error.module.scss'
import Modal from '../Modal/Modal'

function Error (props: { message: string, hideErrorCallback: () => void }) {
  return <Modal title='Error' closeCallback={props.hideErrorCallback}>
        <div className={classes.error}>
            <div className={classes.title}>Something went wrong</div>
            <div className={classes.message}>{props.message}</div>
            <div className={classes.buttons}>
                <button onClick={props.hideErrorCallback}>OK</button>
            </div>
        </div>
    </Modal>
}

export default Error
