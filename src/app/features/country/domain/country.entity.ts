import { AppError } from '@app/shared/types/exception.types'

export interface Country {
  createdAt: string
  createdBy: string
  id: number
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

export type CountryFormMode = 'edit' | 'new'

export interface CountryState {
  countries: Country[]
  country: Country | null
  error: AppError | null
  loading: boolean
}

export type CountryViewMode = 'list' | 'show' | CountryFormMode
