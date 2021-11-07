import { Dispatch, useEffect, useState } from 'react'
import useIsMounted from './useIsMounted'

export default function useDelay<Type = string> (initialState: Type): [Type, Type, Dispatch<Type>] {
  const [value, setValue] = useState<Type>(initialState)
  const [delayedValue, setDelayedValue] = useState<Type>(initialState)
  const [timer, setTimer] = useState<{ id: number, value: Type } | null>(null)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (timer?.value === value) {
      return
    }
    clearTimeout(timer?.id)

    const id = window.setTimeout(() => {
      if (isMounted()) {
        setDelayedValue(value)
      }
    }, 500)
    setTimer({
      id,
      value
    })
  }, [value, timer, isMounted])

  return [value, delayedValue, setValue]
}
