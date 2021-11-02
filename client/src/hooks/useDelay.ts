import { Dispatch, useEffect, useState } from 'react'

export default function useDelay (initialState: string): [string, string, Dispatch<string>] {
  const [value, setValue] = useState<string>(initialState)
  const [delayedValue, setDelayedValue] = useState<string>(initialState)
  const [timer, setTimer] = useState<{id: number, value: string}|null>(null)

  useEffect(() => {
    if (timer?.value === value) {
      return
    }
    clearTimeout(timer?.id)

    if (value.length) {
      const id = window.setTimeout(() => {
        setDelayedValue(value)
      }, 500)
      setTimer({
        id,
        value
      })
    } else {
      setDelayedValue('')
    }
  }, [value, timer])

  return [value, delayedValue, setValue]
}
