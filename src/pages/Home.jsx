import TableAvailability from '../components/TableAvailability'
import FeaturedRecipe from '../components/FeaturedRecipe'

export default function Home() {
  return (
    <div className="stack">
      <section className="hero">
        <h1>Café Aurora</h1>
        <p className="muted">Sabores andinos, ambiente cálido. Reserva, pide y disfruta.</p>
      </section>

      <FeaturedRecipe />   {/* Paso 2 */}
      <TableAvailability /> {/* Paso 1 (Camuflado) */}
    </div>
  )
}