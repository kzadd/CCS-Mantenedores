import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { companiesAdapter, companyAdapter } from '../infrastructure/company.adapter'
import { ApiCompanyRepository } from '../infrastructure/company.service'
import { companyActions } from './company.actions'

@Injectable()
export class CompanyEffect {
  private _actions = inject(Actions)
  private _apiCompanyRepository = inject(ApiCompanyRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles companies thunk.
   */
  companiesThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(companyActions.loadCompanies),
      concatMap(() => {
        return this._apiCompanyRepository.getCompanies().pipe(
          map(response => {
            const successResponse = {
              companies: companiesAdapter(response)
            }

            return companyActions.loadCompaniesSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(companyActions.loadCompaniesFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles company by id thunk.
   */
  companyByIdThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(companyActions.loadCompany),
      concatMap(({ id }) => {
        return this._apiCompanyRepository.getCompanyById(id).pipe(
          map(response => {
            const successResponse = {
              company: companyAdapter(response.data)
            }

            return companyActions.loadCompanySuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(companyActions.loadCompanyFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles create company thunk.
   */
  createCompanyThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(companyActions.createCompany),
      concatMap(({ company }) => {
        return this._apiCompanyRepository.createCompany(company).pipe(
          map(() => {
            this._toast.success('¡Excelente! La empresa se ha creado exitosamente.', 'Empresa')

            return companyActions.createCompanySuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(companyActions.createCompanyFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles update company thunk.
   */
  updateCompanyThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(companyActions.updateCompany),
      concatMap(({ id, company }) => {
        return this._apiCompanyRepository.updateCompany(id, company).pipe(
          map(() => {
            this._toast.success('¡Excelente! La empresa se ha actualizado exitosamente.', 'Empresa')

            return companyActions.updateCompanySuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(companyActions.updateCompanyFailure(failureResponse))
          })
        )
      })
    )
  })
}
