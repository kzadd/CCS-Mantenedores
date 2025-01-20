import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface Company {
  id: string
}

export interface CompanyApiResponse {
  EmpresaId: number
}

export type CompanyForm = FormControlGroup<Company>
export type CompanyFormViewMode = 'edit' | 'new'
export type CompanyKey = Extract<keyof Company, string>

export interface CompanyState {
  companies: Company[]
  company: Company | null
  error: AppError | null
  loading: boolean
}

export type CompanyViewMode = 'list' | 'show' | CompanyFormViewMode
