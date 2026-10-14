// ============================================================
// PASO 3 (contexto) + useReducer (hook adicional)
// ============================================================
import { createContext, useContext, useMemo, useReducer } from 'react'
import { cartReducer, initialCartState } from '../reducers/cartReducer'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const value = useMemo(() => ({
    items: state.items,
    total: state.total,
    count: state.items.reduce((s, i) => s + i.qty, 0),
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    decrement: (id) => dispatch({ type: 'DECREMENT', payload: { id } }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}