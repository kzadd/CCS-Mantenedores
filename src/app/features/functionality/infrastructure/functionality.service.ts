import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { Functionality, FunctionalityApiResponse } from '../domain/functionality.entity'
import { FunctionalityRepository } from '../domain/functionality.repository'

/**
 * Repository implementation that handles fetching functionality data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiFunctionalityRepository implements FunctionalityRepository {
  private _http = inject(HttpService)

  createFunctionality(functionality: Functionality): Observable<ApiResponse<FunctionalityApiResponse>> {
    const body = {
      FuncionalidadId: functionality.id
    }

    return this._http.post(`${env.API_URL}/funcionalidad`, { body })
  }

  getFunctionalities(): Observable<ApiResponse<FunctionalityApiResponse[]>> {
    return this._http.get(`${env.API_URL}/funcionalidad`)
  }

  getFunctionalityById(id: string): Observable<ApiResponse<FunctionalityApiResponse>> {
    return this._http.get(`${env.API_URL}/funcionalidad/${id}`)
  }

  updateFunctionality(id: string, functionality: Functionality): Observable<ApiResponse<FunctionalityApiResponse>> {
    const body = {
      FuncionalidadId: functionality.id
    }

    return this._http.patch(`${env.API_URL}/funcionalidad/${id}`, { body })
  }
}
