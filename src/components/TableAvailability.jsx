import { Profiler, useRef, useState } from 'react'

// ============================================================
// PASO 1: Ciclo de render (useState vs props) + <Profiler>
// ============================================================

function RoomStatus({ reservas }) {
  const renders = useRef(0)
  renders.current += 1
  console.log(`[Métrica] Hijo (RoomStatus) renders: ${renders.current}`)

  const mesasTotales = 20
  const disponibles = Math.max(0, mesasTotales - reservas)

  return (
    <div className="render-box">
      <h4>Estado del Salón</h4>
      <p>Mesas disponibles: <strong>{disponibles}</strong> / {mesasTotales}</p>
      <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(reservas / mesasTotales) * 100}%`, background: reservas > 15 ? '#dc2626' : 'var(--primary)', transition: 'width 0.3s' }}></div>
      </div>
      {reservas >= mesasTotales && <p className="error" style={{ marginTop: '8px' }}>¡Salón lleno!</p>}
    </div>
  )
}

function ReservationManager({ reservas, setReservas }) {
  const renders = useRef(0)
  renders.current += 1
  console.log(`[Métrica] Padre (ReservationManager) renders: ${renders.current}`)

  return (
    <div className="render-box">
      <h4>Gestión de Reservas</h4>
      <p>Total hoy: <strong>{reservas}</strong></p>
      <div className="row" style={{ marginTop: '8px' }}>
        <button onClick={() => setReservas(r => r + 1)}>+ Reserva</button>
        <button className="ghost" onClick={() => setReservas(r => Math.max(0, r - 1))}>- Cancelar</button>
        <button className="ghost" onClick={() => setReservas(0)}>Reiniciar</button>
      </div>
    </div>
  )
}

function onRender(id, phase, actualDuration) {
  console.log(`[Profiler] ${id} · ${phase} · ${actualDuration.toFixed(2)}ms`)
}

export default function TableAvailability() {
  const [reservas, setReservas] = useState(0)

  return (
    <section className="card">
      <div className="section-head">
        <h3>Disponibilidad en Tiempo Real</h3>
        <small className="muted">Métricas ocultas en consola (F12)</small>
      </div>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        Gestiona las reservas del día y observa cómo el estado se propaga a los componentes hijos.
      </p>

      <Profiler id="Paso1-Reservas" onRender={onRender}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ReservationManager reservas={reservas} setReservas={setReservas} />
          <RoomStatus reservas={reservas} />
        </div>
      </Profiler>
    </section>
  )
}