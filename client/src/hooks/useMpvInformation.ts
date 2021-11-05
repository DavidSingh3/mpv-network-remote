import { useState } from 'react'
import useSocketConnectedEffect from './useSocketConnectedEffect'

export default function useMpvInformation (): {
  mute: boolean,
  pause: boolean,
  fullscreen: boolean,
  volume: number,
  } {
  const [mute, setMute] = useState<boolean>(false)
  const [pause, setPause] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(100)

  useSocketConnectedEffect((socket) => {
    socket.on('mpv-property-change', (property, value) => {
      switch (property) {
        case 'mute':
          setMute(value)
          break
        case 'pause':
          setPause(value)
          break
        case 'fullscreen':
          setFullscreen(value)
          break
        case 'volume':
          setVolume(value)
          break
        case '':
          setMute(value)
          break
      }
    })
  })

  return {
    mute,
    pause,
    fullscreen,
    volume
  }
}
