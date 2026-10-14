// ============================================================
// PASO 5: Hook personalizado → useFetch (extraído del Paso 2)
// Reglas de Hooks: se llama SIEMPRE en el nivel superior.
// ============================================================
import { useEffect, useRef, useState } from 'react'

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Ref para no meter `options` en el dependency array (evita loops si es objeto)
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url, { signal: controller.signal, ...optionsRef.current })
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        setData(await res.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}