import { useContext, useEffect, useRef } from 'react'
import { SocketContext } from '../components/SocketContextManager/SocketContextManager'
import { Socket } from 'socket.io-client'

type Callback = (socket: Socket) => void

export default function useSocketConnectedEffect (callback: Callback) {
  const { socket, connected } = useContext(SocketContext)
  const callbackRef = useRef<Callback>(callback)

  useEffect(() => {
    if (connected) {
      callbackRef.current(socket)
    }
  }, [socket, connected])
}
