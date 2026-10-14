// ============================================================
// PASO 5: Hook personalizado → useDebounce
// ============================================================
import { useEffect, useState } from 'react'

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t) // cleanup: cancela el timeout pendiente
  }, [value, delay])

  return debounced
}