import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface Dealership {
  id: string
}

export interface DealershipApiResponse {
  ConcesionarioId: number
}

export type DealershipForm = FormControlGroup<Dealership>
export type DealershipFormViewMode = 'edit' | 'new'
export type DealershipKey = Extract<keyof Dealership, string>

export interface DealershipState {
  dealerships: Dealership[]
  dealership: Dealership | null
  error: AppError | null
  loading: boolean
}

export type DealershipViewMode = 'list' | 'show' | DealershipFormViewMode
