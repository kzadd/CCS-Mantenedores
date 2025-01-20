import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { Role, RoleApiResponse } from '../domain/role.entity'
import { RoleRepository } from '../domain/role.repository'

/**
 * Repository implementation that handles fetching role data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiRoleRepository implements RoleRepository {
  private _http = inject(HttpService)

  createRole(role: Role): Observable<ApiResponse<RoleApiResponse>> {
    const body = {
      RolId: role.id
    }

    return this._http.post(`${env.API_URL}/rol`, { body })
  }

  getRoles(): Observable<ApiResponse<RoleApiResponse[]>> {
    return this._http.get(`${env.API_URL}/rol`)
  }

  getRoleById(id: string): Observable<ApiResponse<RoleApiResponse>> {
    return this._http.get(`${env.API_URL}/rol/${id}`)
  }

  updateRole(id: string, role: Role): Observable<ApiResponse<RoleApiResponse>> {
    const body = {
      RolId: role.id
    }

    return this._http.patch(`${env.API_URL}/rol/${id}`, { body })
  }
}
