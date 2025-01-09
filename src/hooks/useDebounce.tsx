import { useEffect, useState } from 'react'

const useDebounce = <T, >(value: T, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedVal
}

export default useDebounce
