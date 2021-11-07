import { createContext, ReactElement, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import getEndpointURL from '../../util/getEndpointURL'
import useIsMounted from '../../hooks/useIsMounted'

const url = getEndpointURL('/').toString()
const socket = io(url)

type SocketContextType = {
  socket: Socket,
  connected: boolean
}

export const SocketContext = createContext<SocketContextType>({
  socket,
  connected: socket.connected
})

export default function SocketContextManager (props: { children: ReactElement }) {
  const [connected, setConnected] = useState(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    setConnected(socket.connected)
    socket.on('connect', () => {
      if (isMounted()) {
        process.nextTick(() => {
          if (isMounted()) {
            socket.emit('mpv-subscribe')
            socket.emit('mpv-request')
            setConnected(socket.connected)
          }
        })
      }
    })
    socket.on('disconnect', () => {
      if (isMounted()) {
        setConnected(socket.connected)
      }
    })
  }, [isMounted])

  return <SocketContext.Provider value={{ socket, connected }}>
    {props.children}
  </SocketContext.Provider>
}
