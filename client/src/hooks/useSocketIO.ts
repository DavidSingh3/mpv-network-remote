import { io } from 'socket.io-client'
import getEndpointURL from '../util/getEndpointURL'

const url = getEndpointURL('/').toString()
const socket = io(url)

socket.on('connect', () => {
  process.nextTick(() => {
    socket.emit('ready')
  })
})

export default function useSocketIO () {
  return socket
}
