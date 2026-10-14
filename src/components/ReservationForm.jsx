// ============================================================
// PASO 5: Hook personalizado → useForm
// ============================================================
import { useState } from 'react'
import { useForm } from '../hooks/useForm'

const initialValues = {
  nombre: '', email: '', fecha: '', personas: '2', comentarios: '',
}

function validate(values) {
  const errors = {}
  if (!values.nombre.trim()) errors.nombre = 'Ingresa tu nombre'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email inválido'
  if (!values.fecha) errors.fecha = 'Elige una fecha'
  const p = Number(values.personas)
  if (!p || p < 1 || p > 12) errors.personas = 'Entre 1 y 12 personas'
  return errors
}

export default function ReservationForm() {
  const [sent, setSent] = useState(false)
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } =
    useForm(initialValues, validate)

  const onSubmit = (data) => {
    setSent(true)
    console.log('Reserva enviada:', data) // aquí iría el POST real
  }

  return (
    <form className="card form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>Reserva tu mesa</h3>

      <label>Nombre
        <input name="nombre" value={values.nombre} onChange={handleChange} onBlur={handleBlur} />
        {touched.nombre && errors.nombre && <span className="error">{errors.nombre}</span>}
      </label>

      <label>Email
        <input name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        {touched.email && errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>Fecha
        <input name="fecha" type="date" value={values.fecha} onChange={handleChange} onBlur={handleBlur} />
        {touched.fecha && errors.fecha && <span className="error">{errors.fecha}</span>}
      </label>

      <label>Personas
        <input name="personas" type="number" min="1" max="12"
               value={values.personas} onChange={handleChange} onBlur={handleBlur} />
        {touched.personas && errors.personas && <span className="error">{errors.personas}</span>}
      </label>

      <label>Comentarios
        <textarea name="comentarios" rows="3"
                  value={values.comentarios} onChange={handleChange} />
      </label>

      <div className="row">
        <button type="submit">Enviar reserva</button>
        <button type="button" className="ghost" onClick={reset}>Limpiar</button>
      </div>

      {sent && <p className="success">¡Gracias! Te confirmaremos por email.</p>}
    </form>
  )
}