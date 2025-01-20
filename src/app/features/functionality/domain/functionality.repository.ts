import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { Functionality, FunctionalityApiResponse } from './functionality.entity'

/**
 * Repository interface that defines the contract for accessing functionality data.
 */
export interface FunctionalityRepository {
  createFunctionality(functionality: Functionality): Observable<ApiResponse<FunctionalityApiResponse>>
  getFunctionalities(): Observable<ApiResponse<FunctionalityApiResponse[]>>
  getFunctionalityById(id: string): Observable<ApiResponse<FunctionalityApiResponse>>
  updateFunctionality(id: string, functionality: Functionality): Observable<ApiResponse<FunctionalityApiResponse>>
}
