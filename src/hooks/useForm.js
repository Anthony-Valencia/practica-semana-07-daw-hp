// ============================================================
// PASO 5: Hook personalizado → useForm
// Encapsula estado + validación + submit de un formulario.
// ============================================================
import { useCallback, useState } from 'react'

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    if (validate) setErrors(validate(values))
  }, [values, validate])

  const handleSubmit = useCallback((onValid) => (e) => {
    e.preventDefault()
    const v = validate ? validate(values) : {}
    setErrors(v)
    setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}))
    if (Object.keys(v).length === 0) {
      onValid(values)
      setValues(initialValues)
      setTouched({})
    }
  }, [values, validate, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset }
}