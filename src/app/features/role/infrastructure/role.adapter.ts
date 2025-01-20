import { ApiResponse } from '@app/shared/types/http.types'
import { Role, RoleApiResponse } from '../domain/role.entity'

/**
 * Adapts the API response to the Role domain model.
 */
export const roleAdapter = (response: RoleApiResponse): Role => ({
  id: response.RolId.toString() ?? ''
})

/**
 * Adapts the API response to the Role domain model.
 */
export const rolesAdapter = (response: ApiResponse<RoleApiResponse[]>): Role[] => {
  return response.data.map((role: RoleApiResponse) => roleAdapter(role))
}
