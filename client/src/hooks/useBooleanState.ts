import { useState } from 'react'

export default function useBooleanState (defaultValue: boolean): [
    boolean,
    (newValue: boolean) => void,
    () => void
] {
  const [value, setValue] = useState<boolean>(defaultValue)
  const flipValue = () => setValue(!value)

  return [value, setValue, flipValue]
}
