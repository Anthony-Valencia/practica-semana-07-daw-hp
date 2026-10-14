// ============================================================
// PASO 4: useRef → manipulación de DOM (focus) sin re-render
// ============================================================
import { useEffect, useRef } from 'react'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)
  const renders = useRef(0)
  renders.current += 1

  useEffect(() => {
    inputRef.current?.focus() // NO dispara re-render
  }, [])

  return (
    <div className="searchbar">
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar plato, cocina o ingrediente…"
        value={value}
        onChange={onChange}
      />
      <small className="muted">Renders del buscador: {renders.current}</small>
    </div>
  )
}