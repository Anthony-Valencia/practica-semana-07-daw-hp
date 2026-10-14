import ReservationForm from '../components/ReservationForm'

export default function Reserve() {
  return (
    <div className="stack">
      <header className="section-head">
        <h2>Reservar mesa</h2>
        <p className="muted">Formulario gestionado con <code>useForm</code> (Paso 5).</p>
      </header>
      <ReservationForm />
    </div>
  )
}