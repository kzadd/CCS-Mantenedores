import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface Country {
  createdAt: string
  createdBy: string
  id: string
  name: string
  status: boolean
  updatedAt: string
  updatedBy: string
}

export interface CountryApiResponse {
  PaisEstado: boolean
  PaisId: number
  PaisInsertFhora: string
  PaisInsertUsuario: string
  PaisNombre: string
  PaisUpdateFhora: string
  PaisUpdateUsuario: string
}

export type CountryForm = FormControlGroup<Country>
export type CountryFormMode = 'edit' | 'new'
export type CountryKey = Extract<keyof Country, string>

export interface CountryState {
  countries: Country[]
  country: Country | null
  error: AppError | null
  loading: boolean
}

export type CountryViewMode = 'list' | 'show' | CountryFormMode
