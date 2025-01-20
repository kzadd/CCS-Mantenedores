import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface Functionality {
  id: string
}

export interface FunctionalityApiResponse {
  FuncionalidadId: number
}

export type FunctionalityForm = FormControlGroup<Functionality>
export type FunctionalityFormViewMode = 'edit' | 'new'
export type FunctionalityKey = Extract<keyof Functionality, string>

export interface FunctionalityState {
  functionalities: Functionality[]
  functionality: Functionality | null
  error: AppError | null
  loading: boolean
}

export type FunctionalityViewMode = 'list' | 'show' | FunctionalityFormViewMode
