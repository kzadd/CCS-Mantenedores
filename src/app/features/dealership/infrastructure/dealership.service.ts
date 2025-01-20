import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { Dealership, DealershipApiResponse } from '../domain/dealership.entity'
import { DealershipRepository } from '../domain/dealership.repository'

/**
 * Repository implementation that handles fetching dealership data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiDealershipRepository implements DealershipRepository {
  private _http = inject(HttpService)

  createDealership(dealership: Dealership): Observable<ApiResponse<DealershipApiResponse>> {
    const body = {
      ConcesionarioId: dealership.id
    }

    return this._http.post(`${env.API_URL}/concesionario`, { body })
  }

  getDealerships(): Observable<ApiResponse<DealershipApiResponse[]>> {
    return this._http.get(`${env.API_URL}/concesionario`)
  }

  getDealershipById(id: string): Observable<ApiResponse<DealershipApiResponse>> {
    return this._http.get(`${env.API_URL}/concesionario/${id}`)
  }

  updateDealership(id: string, dealership: Dealership): Observable<ApiResponse<DealershipApiResponse>> {
    const body = {
      ConcesionarioId: dealership.id
    }

    return this._http.patch(`${env.API_URL}/concesionario/${id}`, { body })
  }
}
