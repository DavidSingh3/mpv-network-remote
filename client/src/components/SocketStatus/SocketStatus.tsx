import classes from './SocketStatus.module.scss'
import { MdConnectedTv } from 'react-icons/md'
import { createPortal } from 'react-dom'
import { useContext } from 'react'
import { SocketContext } from '../SocketContextManager/SocketContextManager'

export default function SocketStatus () {
  const { socket, connected } = useContext(SocketContext)
  return <div className={classes.socketStatus}>
    {
      connected
        ? <div className={classes.connected}>
          <MdConnectedTv/> <span>Connected: {socket.id}</span>
        </div>
        : <div className={classes.disconnected}>
          <MdConnectedTv/> <span>Not Connected</span>
          {
            createPortal(
              <div className={classes.disconnectedOverlay}/>,
              document.body
            )
          }
        </div>
    }
  </div>
}
