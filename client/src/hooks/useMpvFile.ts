import { useEffect, useState } from 'react'
import useChapters, { Chapters } from './useChapters'
import useSocketConnectedEffect from './useSocketConnectedEffect'
import useIsMounted from './useIsMounted'

export type MPVFile = {
  path: string,
  filename: string,
  mediaTitle: string,
  duration: number,
  timePosition: number,
  chapters: Chapters | null
}

export default function useMpvFile (): MPVFile | null {
  const [file, setFile] = useState<MPVFile | null>(null)
  const [path, setPath] = useState<string | null>(null)
  const [filename, setFilename] = useState<string | null>(null)
  const [mediaTitle, setMediaTitle] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [timePosition, setTimePosition] = useState<number | null>(null)
  const chapters = useChapters()
  const isMounted = useIsMounted()

  useEffect(() => {
    if ([path, filename, mediaTitle, duration, timePosition].includes(null)) {
      setFile(null)
    } else {
      setFile({
        path: path as string,
        filename: filename as string,
        mediaTitle: mediaTitle as string,
        duration: duration as number,
        timePosition: timePosition as number,
        chapters
      })
    }
  }, [path, filename, mediaTitle, duration, timePosition, chapters])

  useSocketConnectedEffect((socket) => {
    const listener = (property: any, value: any) => {
      if (isMounted()) {
        switch (property) {
          case 'path':
            setPath(value)
            break
          case 'filename':
            setFilename(value)
            break
          case 'media-title':
            setMediaTitle(value)
            break
          case 'duration':
            setDuration(Math.floor(value))
            break
          case 'timeposition':
            setTimePosition(Math.floor(value))
            break
        }
      }
    }
    socket.on('mpv-property-change', listener)
    socket.emit('mpv-request')
    return () => {
      socket.removeListener('mpv-property-change', listener)
    }
  })

  return file
}
