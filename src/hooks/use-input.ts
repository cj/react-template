import React, { useState, useCallback } from 'react'

type UseInput<T> = [
  {
    value: T
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  },
  (setValue: T) => void
]

export const useInput = (initialValue: string): UseInput<string> => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return [{ value, onChange }, setValue]
}

export default useInput
