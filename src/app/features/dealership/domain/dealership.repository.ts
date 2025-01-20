import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { Dealership, DealershipApiResponse } from './dealership.entity'

/**
 * Repository interface that defines the contract for accessing dealership data.
 */
export interface DealershipRepository {
  createDealership(dealership: Dealership): Observable<ApiResponse<DealershipApiResponse>>
  getDealerships(): Observable<ApiResponse<DealershipApiResponse[]>>
  getDealershipById(id: string): Observable<ApiResponse<DealershipApiResponse>>
  updateDealership(id: string, dealership: Dealership): Observable<ApiResponse<DealershipApiResponse>>
}
