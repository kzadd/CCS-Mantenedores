import { ApiResponse } from '@app/shared/types/http.types'
import { User, UserApiResponse } from '../domain/user.entity'

/**
 * Adapts the API response to the User domain model.
 */
export const userAdapter = (response: UserApiResponse): User => ({
  id: response.UsuarioId.toString() ?? ''
})

/**
 * Adapts the API response to the User domain model.
 */
export const usersAdapter = (response: ApiResponse<UserApiResponse[]>): User[] => {
  return response.data.map((user: UserApiResponse) => userAdapter(user))
}
