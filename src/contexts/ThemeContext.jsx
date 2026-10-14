// ============================================================
// PASO 3: useContext → ThemeContext (tema claro/oscuro)
// Separado por dominio: NO mezclar con AuthContext/CartContext
// ============================================================
import {
  createContext, useContext, useEffect, useState, useCallback, useMemo,
} from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('aurora-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Efecto secundario: persiste el tema y lo aplica al <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('aurora-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  // useMemo evita recrear el value → evita re-render de consumidores
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}