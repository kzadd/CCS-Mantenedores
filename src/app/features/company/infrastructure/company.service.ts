import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { Company, CompanyApiResponse } from '../domain/company.entity'
import { CompanyRepository } from '../domain/company.repository'

/**
 * Repository implementation that handles fetching company data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiCompanyRepository implements CompanyRepository {
  private _http = inject(HttpService)

  createCompany(company: Company): Observable<ApiResponse<CompanyApiResponse>> {
    const body = {
      EmpresaId: company.id
    }

    return this._http.post(`${env.API_URL}/empresa`, { body })
  }

  getCompanies(): Observable<ApiResponse<CompanyApiResponse[]>> {
    return this._http.get(`${env.API_URL}/empresa`)
  }

  getCompanyById(id: string): Observable<ApiResponse<CompanyApiResponse>> {
    return this._http.get(`${env.API_URL}/empresa/${id}`)
  }

  updateCompany(id: string, company: Company): Observable<ApiResponse<CompanyApiResponse>> {
    const body = {
      EmpresaId: company.id
    }

    return this._http.patch(`${env.API_URL}/empresa/${id}`, { body })
  }
}
