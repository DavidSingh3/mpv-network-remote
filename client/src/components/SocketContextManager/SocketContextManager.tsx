import { createContext, ReactElement, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import getEndpointURL from '../../util/getEndpointURL'

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

  useEffect(() => {
    setConnected(socket.connected)
    socket.on('connect', () => {
      process.nextTick(() => {
        socket.emit('mpv-subscribe')
        socket.emit('mpv-request')
        setConnected(socket.connected)
      })
    })
    socket.on('disconnect', () => {
      setConnected(socket.connected)
    })
  }, [])

  return <SocketContext.Provider value={{ socket, connected }}>
        {props.children}
    </SocketContext.Provider>
}
