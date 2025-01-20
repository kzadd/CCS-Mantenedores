import { AppError } from '@app/shared/types/exception.types'
import { FormControlGroup } from '@app/shared/types/form.types'

export interface User {
  id: string
}

export interface UserApiResponse {
  UsuarioId: number
}

export type UserForm = FormControlGroup<User>
export type UserFormViewMode = 'edit' | 'new'
export type UserKey = Extract<keyof User, string>

export interface UserState {
  users: User[]
  user: User | null
  error: AppError | null
  loading: boolean
}

export type UserViewMode = 'list' | 'show' | UserFormViewMode
