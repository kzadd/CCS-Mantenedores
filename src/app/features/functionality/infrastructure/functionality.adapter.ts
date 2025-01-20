import { ApiResponse } from '@app/shared/types/http.types'
import { Functionality, FunctionalityApiResponse } from '../domain/functionality.entity'

/**
 * Adapts the API response to the Functionality domain model.
 */
export const functionalitiesAdapter = (response: ApiResponse<FunctionalityApiResponse[]>): Functionality[] => {
  return response.data.map((functionality: FunctionalityApiResponse) => functionalityAdapter(functionality))
}

/**
 * Adapts the API response to the Functionality domain model.
 */
export const functionalityAdapter = (response: FunctionalityApiResponse): Functionality => ({
  id: response.FuncionalidadId.toString() ?? ''
})
