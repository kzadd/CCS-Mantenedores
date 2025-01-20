import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { User, UserApiResponse } from './user.entity'

/**
 * Repository interface that defines the contract for accessing user data.
 */
export interface UserRepository {
  createUser(user: User): Observable<ApiResponse<UserApiResponse>>
  getUsers(): Observable<ApiResponse<UserApiResponse[]>>
  getUserById(id: string): Observable<ApiResponse<UserApiResponse>>
  updateUser(id: string, user: User): Observable<ApiResponse<UserApiResponse>>
}
