import classes from './IconButton.module.scss'
import { IconType } from 'react-icons'

export default function IconButton (props: { Icon: IconType, text: string, onClick: () => void, className?: string }) {
  return <button className={[classes.iconButton, props.className ?? ''].join(' ')} onClick={props.onClick}>
    <props.Icon/>
    <span>{props.text}</span>
  </button>
}
