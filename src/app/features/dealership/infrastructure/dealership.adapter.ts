import { ApiResponse } from '@app/shared/types/http.types'
import { Dealership, DealershipApiResponse } from '../domain/dealership.entity'

/**
 * Adapts the API response to the Dealership domain model.
 */
export const dealershipAdapter = (response: DealershipApiResponse): Dealership => ({
  id: response.ConcesionarioId.toString() ?? ''
})

/**
 * Adapts the API response to the Dealership domain model.
 */
export const dealershipsAdapter = (response: ApiResponse<DealershipApiResponse[]>): Dealership[] => {
  return response.data.map((dealership: DealershipApiResponse) => dealershipAdapter(dealership))
}
