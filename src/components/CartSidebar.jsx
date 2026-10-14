import { useCart } from '../contexts/CartContext'

export default function CartSidebar({ open, onClose }) {
  const { items, total, count, addItem, decrement, removeItem, clear } = useCart()

  return (
    <aside className={`cart ${open ? 'open' : ''}`}>
      <header className="cart-header">
        <h3>Tu pedido ({count})</h3>
        <button className="ghost" onClick={onClose}>✕</button>
      </header>

      {items.length === 0 ? (
        <p className="muted">Aún no agregas platos.</p>
      ) : (
        <ul className="cart-list">
          {items.map(it => (
            <li key={it.id}>
              <div>
                <strong>{it.name}</strong>
                <div className="muted">S/ {it.price.toFixed(2)} · x{it.qty}</div>
              </div>
              <div className="row">
                <button onClick={() => decrement(it.id)}>-</button>
                <button onClick={() => addItem(it)}>+</button>
                <button className="ghost" onClick={() => removeItem(it.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="cart-footer">
        <div>Total: <strong>S/ {total.toFixed(2)}</strong></div>
        <button onClick={clear} disabled={items.length === 0}>Vaciar</button>
      </footer>
    </aside>
  )
}