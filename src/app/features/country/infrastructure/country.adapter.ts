import { ApiResponse } from '@app/shared/types/http.types'
import { formatDateToShortDate } from '@app/shared/utils/formatter.utils'
import { Country, CountryApiResponse } from '../domain/country.entity'

/**
 * Adapts the API response to the Country domain model.
 */
export const countriesAdapter = (response: ApiResponse<CountryApiResponse[]>): Country[] => {
  return response.data.map((country: CountryApiResponse) => countryAdapter(country))
}

/**
 * Adapts the API response to the Country domain model.
 */
export const countryAdapter = (response: CountryApiResponse): Country => ({
  createdAt: formatDateToShortDate(response.PaisInsertFhora),
  createdBy: response.PaisInsertUsuario ?? '',
  id: response.PaisId.toString() ?? '',
  name: response.PaisNombre ?? '',
  status: response.PaisEstado ?? false,
  updatedAt: formatDateToShortDate(response.PaisUpdateFhora),
  updatedBy: response.PaisUpdateUsuario ?? ''
})
