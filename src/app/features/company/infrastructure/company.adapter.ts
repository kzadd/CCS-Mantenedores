import { ApiResponse } from '@app/shared/types/http.types'
import { Company, CompanyApiResponse } from '../domain/company.entity'

/**
 * Adapts the API response to the Company domain model.
 */
export const companiesAdapter = (response: ApiResponse<CompanyApiResponse[]>): Company[] => {
  return response.data.map((company: CompanyApiResponse) => companyAdapter(company))
}

/**
 * Adapts the API response to the Company domain model.
 */
export const companyAdapter = (response: CompanyApiResponse): Company => ({
  id: response.EmpresaId.toString() ?? ''
})
