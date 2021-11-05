import { useEffect, useState } from 'react'
import useSocketConnectedEffect from './useSocketConnectedEffect'

export type Chapter = {
    time: number,
    title: string
}

export type Chapters = {
    list: Chapter[],
    index: number,
    current: Chapter
}

export default function useChapters (): Chapters | null {
  const [list, setList] = useState<Chapter[] | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const [chapters, setChapters] = useState<Chapters | null>(null)

  useEffect(() => {
    if ([list, index].includes(null)) {
      setChapters(null)
    } else {
      setChapters({
        list: list as Chapter[],
        index: index as number,
        current: list?.[index as number] as Chapter
      })
    }
  }, [list, index])

  useSocketConnectedEffect((socket) => {
    const listener = (property: any, value: any) => {
      switch (property) {
        case 'chapter-list':
          setList(value)
          break
        case 'chapter':
          setIndex(value)
          break
      }
    }
    socket.on('mpv-property-change', listener)
    return () => {
      socket.removeListener('mpv-property-change', listener)
    }
  })

  return chapters
}
