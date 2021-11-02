import { useState } from 'react'

export default function useBooleanState (defaultValue: boolean): [
    boolean,
    (newValue?: boolean) => void,
] {
  const [value, setValue] = useState<boolean>(defaultValue)
  const flipOrSetValue = (newValue?: boolean) => {
    if (typeof newValue === 'boolean') {
      setValue(newValue)
    } else {
      setValue(!value)
    }
  }

  return [value, flipOrSetValue]
}
