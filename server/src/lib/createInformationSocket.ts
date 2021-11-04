import { Server } from 'socket.io'
import MPVWrapper from './mpv'
import http from 'http'
import ensureMpvIsRunning from './mpv/ensureMpvIsRunning'

export default function createInformationSocket (server: http.Server): void {
  const io = new Server(server, { cors: {} })

  io.on('connection', (socket) => {
    console.info('a user connected')

    function emitPropertyChange (property: string, value: string|boolean|number|null): void {
      socket.emit('mpv-property-change', property, value)
    }

    ensureMpvIsRunning()
      .then(() => {
        socket.on('ready', () => {
          console.info('a user is ready')
          MPVWrapper.mpv.on('timeposition', (timeposition) => {
            emitPropertyChange('timeposition', timeposition)
          })
          MPVWrapper.mpv.on('status', ({
            property,
            value
          }) => {
            emitPropertyChange(property, value)
          })
        })

        socket.on('mpv-property-change-request', () => {
          const properties = [
            'mute',
            'duration',
            'volume',
            'filename',
            'path',
            'media-title',
            'fullscreen'
          ]

          properties.forEach((property) => {
            MPVWrapper.mpv.getProperty(property).then((value) => {
              emitPropertyChange(property, value)
            }).catch(() => {
              emitPropertyChange(property, null)
            })
          })
          MPVWrapper.mpv.getTimePosition()
            .then((value) => emitPropertyChange('timeposition', value))
            .catch(() => {
              emitPropertyChange('timeposition', 0)
            })
          MPVWrapper.mpv.isPaused()
            .then((value) => emitPropertyChange('pause', value))
            .catch(console.error)
        })
      })
      .catch(console.error)
  })
}
