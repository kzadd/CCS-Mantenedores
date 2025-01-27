import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { User, UserApiResponse } from '../domain/user.entity'
import { UserRepository } from '../domain/user.repository'

/**
 * Repository implementation that handles fetching user data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiUserRepository implements UserRepository {
  private _http = inject(HttpService)

  createUser(user: User): Observable<ApiResponse<UserApiResponse>> {
    const body = {
      EmpresaId: user.id
    }

    return this._http.post(`${env.API_URL_GAM}/gamcentral/rest/`, { body })
  }

  getUsers(): Observable<ApiResponse<UserApiResponse[]>> {
    return this._http.get(`${env.API_URL_GAM}/gamcentral/rest/WS_ConsultaUsuarios`)
  }

  getUserById(id: string): Observable<ApiResponse<UserApiResponse>> {
    return this._http.get(`${env.API_URL_GAM}/gamcentral/rest/${id}`)
  }

  updateUser(id: string, user: User): Observable<ApiResponse<UserApiResponse>> {
    const body = {
      EmpresaId: user.id
    }

    return this._http.patch(`${env.API_URL_GAM}/gamcentral/rest/${id}`, { body })
  }
}
