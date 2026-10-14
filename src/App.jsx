// ============================================================
// PROVIDERS GLOBALES (Paso 3: useContext) + RUTAS
// ============================================================
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reserve from './pages/Reserve'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <ThemeProvider>
      <CartProvider>
        <Header onOpenCart={() => setCartOpen(true)} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservar" element={<Reserve />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
        <Footer />
      </CartProvider>
    </ThemeProvider>
  )
}