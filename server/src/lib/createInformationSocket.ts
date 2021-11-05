import { Server, Socket } from 'socket.io'
import MPVWrapper from './mpv'
import http from 'http'

function emitPropertyChange (socket: Socket, property: string, value: string|boolean|number|null): void {
  socket.emit('mpv-property-change', property, value)
}

function subscribe (socket: Socket) {
  return () => {
    console.info(socket.id, 'subscribed to updates')
    MPVWrapper.mpv.observeProperty('chapter-list')
    MPVWrapper.mpv.observeProperty('chapter')
    MPVWrapper.mpv.on('timeposition', (timeposition) => {
      emitPropertyChange(socket, 'timeposition', timeposition)
    })
    MPVWrapper.mpv.on('status', ({
      property,
      value
    }) => {
      emitPropertyChange(socket, property, value)
    })
  }
}

function request (socket: Socket) {
  return () => {
    console.info(socket.id, 'requested an update')
    const properties = [
      'mute',
      'duration',
      'volume',
      'filename',
      'path',
      'media-title',
      'fullscreen',
      'chapter-list',
      'chapter'
    ]

    properties.forEach((property) => {
      MPVWrapper.mpv.getProperty(property).then((value) => {
        emitPropertyChange(socket, property, value)
      }).catch(() => {
        emitPropertyChange(socket, property, null)
      })
    })
    MPVWrapper.mpv.getTimePosition()
      .then((value) => emitPropertyChange(socket, 'timeposition', value))
      .catch(() => {
        emitPropertyChange(socket, 'timeposition', 0)
      })
    MPVWrapper.mpv.isPaused()
      .then((value) => emitPropertyChange(socket, 'pause', value))
      .catch(console.error)
  }
}

export default function createInformationSocket (server: http.Server): void {
  const io = new Server(server, { cors: {} })
  io.on('connection', (socket) => {
    console.info(socket.id, 'connected')
    socket.on('disconnect', () => console.info(socket.id, 'disconnected'))
    socket.on('mpv-subscribe', subscribe(socket))
    socket.on('mpv-request', request(socket))
  })
}
