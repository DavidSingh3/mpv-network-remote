import { useContext, useEffect, useRef } from 'react'
import { SocketContext } from '../components/SocketContextManager/SocketContextManager'
import { Socket } from 'socket.io-client'
import useIsMounted from './useIsMounted'

type Callback = (socket: Socket) => void

export default function useSocketConnectedEffect (callback: Callback) {
  const { socket, connected } = useContext(SocketContext)
  const callbackRef = useRef<Callback>(callback)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (connected && isMounted()) {
      callbackRef.current(socket)
    }
  }, [socket, connected, isMounted])
}
