import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

const errorMessages = {
  email: 'Ingrese un correo electrónico válido.',
  maxLength: (length: number) => `Este campo no puede exceder los ${length} caracteres.`,
  minLength: (length: number) => `Este campo debe tener al menos ${length} caracteres.`,
  number: 'Este campo solo acepta números.',
  required: 'Este campo es obligatorio.'
}

/**
 * Custom validator to check if input value is a valid email address.
 */
export const isEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const isValid = emailRegex.test(control.value.trim())

  const error = {
    email: errorMessages.email
  }

  return isValid ? null : error
}

/**
 * Custom validator to check if input value contains only numeric characters.
 */
export const isNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null

  const numericRegex = /^[0-9]+$/
  const isValid = numericRegex.test(control.value.trim())

  const error = {
    number: errorMessages.number
  }

  return isValid ? null : error
}

/**
 * Custom validator to check if input field has a non-empty value.
 */
export const isRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isValid = control.value && control.value.trim().length

  const error = {
    required: errorMessages.required
  }

  return isValid ? null : error
}

/**
 * Custom validator factory that creates a validator to check maximum length.
 */
export const maxLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const isValid = control.value.trim().length <= length

    const error = {
      maxlength: errorMessages.maxLength(length)
    }

    return isValid ? null : error
  }
}

/**
 * Custom validator factory that creates a validator to check minimum length.
 */
export const minLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const isValid = control.value.trim().length >= length

    const error = {
      minlength: errorMessages.minLength(length)
    }

    return isValid ? null : error
  }
}
