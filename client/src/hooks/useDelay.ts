import { Dispatch, useEffect, useState } from 'react'

export default function useDelay<Type = string> (initialState: Type): [Type, Type, Dispatch<Type>] {
  const [value, setValue] = useState<Type>(initialState)
  const [delayedValue, setDelayedValue] = useState<Type>(initialState)
  const [timer, setTimer] = useState<{ id: number, value: Type } | null>(null)

  useEffect(() => {
    if (timer?.value === value) {
      return
    }
    clearTimeout(timer?.id)

    const id = window.setTimeout(() => {
      setDelayedValue(value)
    }, 500)
    setTimer({
      id,
      value
    })
  }, [value, timer])

  return [value, delayedValue, setValue]
}
