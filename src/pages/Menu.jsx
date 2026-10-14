// ============================================================
// PASO 4: useMemo (filtro pesado) + useCallback (callbacks estables)
// PASO 5: consume useFetch y useDebounce
// ============================================================
import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'

const API = 'https://dummyjson.com/recipes?limit=30'

export default function Menu() {
  const { data, loading, error } = useFetch(API)          // Paso 5
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('todas')
  const [selected, setSelected] = useState(null)

  const debouncedQuery = useDebounce(query, 350)          // Paso 5

  const recipes = useMemo(() => data?.recipes ?? [], [data])

  // useMemo: calcula la lista de cocinas SOLO si cambian las recetas
  const cuisines = useMemo(() => {
    const set = new Set(recipes.map(r => r.cuisine))
    return ['todas', ...Array.from(set).sort()]
  }, [recipes])

  // useMemo: filtrado "costoso" memorizado
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    return recipes.filter(r => {
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        (r.ingredients ?? []).some(i => i.toLowerCase().includes(q))
      const matchC = cuisine === 'todas' || r.cuisine === cuisine
      return matchQ && matchC
    })
  }, [recipes, debouncedQuery, cuisine])

  // useCallback: referencia estable → RecipeCard (memo) no re-renderiza en vano
  const handleView = useCallback((recipe) => setSelected(recipe), [])
  const handleChange = useCallback((e) => setQuery(e.target.value), [])

  return (
    <div className="stack">
      <header className="section-head">
        <h2>Nuestro menú</h2>
        <p className="muted">{filtered.length} platos disponibles</p>
      </header>

      <div className="filters">
        <SearchBar value={query} onChange={handleChange} />
        <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
          {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading && <p className="muted">Cargando menú…</p>}
      {error && <p className="error">Error al cargar: {error.message}</p>}

      {!loading && !error && (
        <div className="grid">
          {filtered.map(r => (
            <RecipeCard key={r.id} recipe={r} onView={handleView} />
          ))}
          {filtered.length === 0 && <p className="muted">Sin resultados.</p>}
        </div>
      )}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-body" onClick={e => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <img src={selected.image} alt={selected.name} />
            <p className="muted">{selected.cuisine} · ⭐ {selected.rating}</p>
            <h4>Ingredientes</h4>
            <ul>{selected.ingredients?.map(i => <li key={i}>{i}</li>)}</ul>
            <button onClick={() => setSelected(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}