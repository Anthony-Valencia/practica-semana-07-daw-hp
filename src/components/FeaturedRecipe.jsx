// ============================================================
// PASO 2: useEffect + fetch + AbortController (versión "antes")
// Se refactoriza en el Paso 5 → hooks/useFetch.js
// ============================================================
import { useEffect, useState } from 'react'

const API = 'https://dummyjson.com/recipes'

export default function FeaturedRecipe() {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API}/1`, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setRecipe(json)
      } catch (err) {
        // Un abort NO es un error de red
        if (err.name !== 'AbortError') setError(err)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()

    // Cleanup: se ejecuta al desmontar o cuando cambia `API`
    return () => controller.abort()
  }, [])

  if (loading) return <p className="muted">Cargando receta destacada…</p>
  if (error) return <p className="error">Error: {error.message}</p>
  if (!recipe) return null

  return (
    <section className="card featured">
      <img src={recipe.image} alt={recipe.name} />
      <div>
        <span className="tag">Plato destacado</span>
        <h3>{recipe.name}</h3>
        <p className="muted">
          {recipe.cuisine} · {recipe.difficulty} · ⭐ {recipe.rating}
        </p>
        <p>{recipe.instructions?.[0] ?? 'Preparación de la casa.'}</p>
      </div>
    </section>
  )
}