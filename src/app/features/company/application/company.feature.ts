import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { CompanyState } from '../domain/company.entity'
import { companyActions } from './company.actions'

const initialState: CompanyState = {
  companies: [],
  company: null,
  error: null,
  loading: false
}

const defaultErrorState = (state: CompanyState, payload: { error: AppError }): CompanyState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: CompanyState): CompanyState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages company related state and actions.
 */
export const companyFeature = createFeature({
  name: 'company',
  reducer: createReducer(
    initialState,
    on(companyActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(companyActions.loadCompanies, defaultLoadingState),
    on(companyActions.loadCompaniesFailure, defaultErrorState),
    on(companyActions.loadCompaniesSuccess, (state, payload) => ({
      ...state,
      companies: payload.companies,
      loading: false
    })),

    on(companyActions.loadCompany, defaultLoadingState),
    on(companyActions.loadCompanyFailure, defaultErrorState),
    on(companyActions.loadCompanySuccess, (state, payload) => ({
      ...state,
      company: payload.company,
      loading: false
    })),

    on(companyActions.createCompany, defaultLoadingState),
    on(companyActions.createCompanyFailure, defaultErrorState),
    on(companyActions.createCompanySuccess, state => ({
      ...state,
      loading: false
    })),

    on(companyActions.updateCompany, defaultLoadingState),
    on(companyActions.updateCompanyFailure, defaultErrorState),
    on(companyActions.updateCompanySuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
