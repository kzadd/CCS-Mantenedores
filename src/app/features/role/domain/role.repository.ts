import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { Role, RoleApiResponse } from './role.entity'

/**
 * Repository interface that defines the contract for accessing role data.
 */
export interface RoleRepository {
  createRole(role: Role): Observable<ApiResponse<RoleApiResponse>>
  getRoles(): Observable<ApiResponse<RoleApiResponse[]>>
  getRoleById(id: string): Observable<ApiResponse<RoleApiResponse>>
  updateRole(id: string, role: Role): Observable<ApiResponse<RoleApiResponse>>
}
