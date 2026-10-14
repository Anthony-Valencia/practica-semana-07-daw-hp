// ============================================================
// HOOK ADICIONAL: useReducer → lógica compleja del carrito
// ============================================================
export const initialCartState = { items: [], total: 0 }

const recalc = (items) => ({
  items,
  total: items.reduce((s, i) => s + i.price * i.qty, 0),
})

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id)
      if (exists) {
        return recalc(state.items.map(i =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        ))
      }
      return recalc([...state.items, { ...action.payload, qty: 1 }])
    }
    case 'DECREMENT': {
      return recalc(
        state.items
          .map(i => (i.id === action.payload.id ? { ...i, qty: i.qty - 1 } : i))
          .filter(i => i.qty > 0)
      )
    }
    case 'REMOVE_ITEM':
      return recalc(state.items.filter(i => i.id !== action.payload.id))
    case 'CLEAR':
      return initialCartState
    default:
      return state
  }
}