import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { Country, CountryApiResponse } from './country.entity'

/**
 * Repository interface that defines the contract for accessing country data.
 */
export interface CountryRepository {
  createCountry(country: Country): Observable<ApiResponse<CountryApiResponse>>
  getCountries(): Observable<ApiResponse<CountryApiResponse[]>>
  getCountryById(id: string): Observable<ApiResponse<CountryApiResponse>>
  updateCountry(id: string, country: Country): Observable<ApiResponse<CountryApiResponse>>
}
