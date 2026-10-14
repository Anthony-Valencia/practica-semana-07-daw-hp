import { memo } from 'react'
import { useCart } from '../contexts/CartContext'

function RecipeCard({ recipe, onView }) {
  const { addItem } = useCart()
  const price = Number((recipe.id * 3.5 + 5).toFixed(2))

  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.name} loading="lazy" />
      <div className="recipe-body">
        <h4>{recipe.name}</h4>
        <p className="muted">{recipe.cuisine} · ⭐ {recipe.rating}</p>
        <p className="price">S/ {price.toFixed(2)}</p>
        <div className="row">
          <button onClick={() => addItem({ id: recipe.id, name: recipe.name, price })}>
            Agregar
          </button>
          <button className="ghost" onClick={() => onView(recipe)}>Ver</button>
        </div>
      </div>
    </article>
  )
}

// memo: solo re-renderiza si cambian `recipe` u `onView` (que estabilizamos con useCallback)
export default memo(RecipeCard)