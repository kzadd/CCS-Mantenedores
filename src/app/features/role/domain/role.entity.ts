import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface Role {
  id: string
}

export interface RoleApiResponse {
  RolId: number
}

export type RoleForm = FormControlGroup<Role>
export type RoleFormViewMode = 'edit' | 'new'
export type RoleKey = Extract<keyof Role, string>

export interface RoleState {
  roles: Role[]
  role: Role | null
  error: AppError | null
  loading: boolean
}

export type RoleViewMode = 'list' | 'show' | RoleFormViewMode
