import { useEffect, useState } from 'react'
import useMpvFile, { MPVFile } from './useMpvFile'
import useSocketIO from './useSocketIO'

export default function useMpvInformation (): {
    mute: boolean,
    pause: boolean,
    fullscreen: boolean,
    volume: number,
    file: MPVFile | null
    } {
  const [mute, setMute] = useState<boolean>(false)
  const [pause, setPause] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(100)
  const file = useMpvFile()
  const socket = useSocketIO()

  useEffect(() => {
    socket.emit('mpv-property-change-request')
    socket.on('mpv-property-change', (property, value) => {
      switch (property) {
        case 'mute':
          setMute(value)
          break
        case 'pause':
          console.log('should set paused', value)
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
  }, [socket])

  return {
    mute,
    pause,
    fullscreen,
    volume,
    file
  }
}
