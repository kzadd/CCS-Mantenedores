import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { Company, CompanyApiResponse } from './company.entity'

/**
 * Repository interface that defines the contract for accessing company data.
 */
export interface CompanyRepository {
  createCompany(company: Company): Observable<ApiResponse<CompanyApiResponse>>
  getCompanies(): Observable<ApiResponse<CompanyApiResponse[]>>
  getCompanyById(id: string): Observable<ApiResponse<CompanyApiResponse>>
  updateCompany(id: string, company: Company): Observable<ApiResponse<CompanyApiResponse>>
}
