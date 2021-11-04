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
    let isMounted = true
    socket.emit('mpv-property-change-request')
    socket.on('mpv-property-change', (property, value) => {
      if (isMounted) {
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
      }
    })

    return () => {
      isMounted = false
    }
  }, [socket])

  return {
    mute,
    pause,
    fullscreen,
    volume,
    file
  }
}
