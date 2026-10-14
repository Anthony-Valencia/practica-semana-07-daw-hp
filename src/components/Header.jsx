import { NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useCart } from '../contexts/CartContext'

export default function Header({ onOpenCart }) {
  const { theme, toggleTheme } = useTheme()
  const { count } = useCart()

  return (
    <header className="header">
      <NavLink to="/" className="brand">
        <span className="logo">☕</span>
        <span>Aurora</span>
      </NavLink>

      <nav className="nav">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/menu">Menú</NavLink>
        <NavLink to="/reservar">Reservar</NavLink>
      </nav>

      <div className="row">
        <button className="ghost" onClick={toggleTheme} aria-label="Cambiar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button onClick={onOpenCart} aria-label="Carrito">
          🛒 {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  )
}