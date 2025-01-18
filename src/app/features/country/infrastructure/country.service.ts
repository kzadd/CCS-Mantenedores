import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { Country, CountryApiResponse } from '../domain/country.entity'
import { CountryRepository } from '../domain/country.repository'

/**
 * Repository implementation that handles fetching country data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiCountryRepository implements CountryRepository {
  private _http = inject(HttpService)

  createCountry(country: Country): Observable<ApiResponse<CountryApiResponse>> {
    const body = {
      PaisEstado: country.status,
      PaisId: country.id,
      PaisInsertFhora: country.createdAt,
      PaisInsertUsuario: country.createdBy,
      PaisNombre: country.name,
      PaisUpdateFhora: country.updatedAt,
      PaisUpdateUsuario: country.updatedBy
    }

    return this._http.post(`${env.API_URL}/pais`, { body })
  }

  getCountries(): Observable<ApiResponse<CountryApiResponse[]>> {
    return this._http.get(`${env.API_URL}/pais`)
  }

  getCountryById(id: string): Observable<ApiResponse<CountryApiResponse>> {
    return this._http.get(`${env.API_URL}/pais/${id}`)
  }

  updateCountry(id: string, country: Country): Observable<ApiResponse<CountryApiResponse>> {
    const body = {
      PaisEstado: country.status,
      PaisId: country.id,
      PaisInsertFhora: country.createdAt,
      PaisInsertUsuario: country.createdBy,
      PaisNombre: country.name,
      PaisUpdateFhora: country.updatedAt,
      PaisUpdateUsuario: country.updatedBy
    }

    return this._http.patch(`${env.API_URL}/pais/${id}`, { body })
  }
}
