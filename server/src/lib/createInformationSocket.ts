import { Server } from 'socket.io'
import mpv from './mpv'
import http from 'http'

export default function createInformationSocket (server: http.Server): void {
  const io = new Server(server, { cors: {} })

  io.on('connection', (socket) => {
    console.log('a user connected')

    function emitPropertyChange (property: string, value: string|boolean|number|null): void {
      socket.emit('mpv-property-change', property, value)
    }
    new Promise<void>((resolve, reject) => {
      try {
        if (!mpv.isRunning()) {
          mpv.start().then(resolve).catch(console.error)
        } else {
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
      .then(() => {
        socket.on('ready', () => {
          console.log('a user is ready')
          mpv.on('timeposition', (timeposition) => {
            emitPropertyChange('timeposition', timeposition)
          })
          mpv.on('status', ({
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
            mpv.getProperty(property).then((value) => {
              // console.log('should send', property, value)
              emitPropertyChange(property, value)
            }).catch(() => {
              emitPropertyChange(property, null)
            })
          })
          mpv.getTimePosition()
            .then((value) => emitPropertyChange('timeposition', value))
            .catch(() => {
              emitPropertyChange('timeposition', 0)
            })
          mpv.isPaused()
            .then((value) => emitPropertyChange('pause', value))
            .catch(console.error)
        })
      })
      .catch(console.error)
  })
}
