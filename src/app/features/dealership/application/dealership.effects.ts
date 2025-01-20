import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { dealershipAdapter, dealershipsAdapter } from '../infrastructure/dealership.adapter'
import { ApiDealershipRepository } from '../infrastructure/dealership.service'
import { dealershipActions } from './dealership.actions'

@Injectable()
export class DealershipEffect {
  private _actions = inject(Actions)
  private _apiDealershipRepository = inject(ApiDealershipRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles dealerships thunk.
   */
  dealershipsThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(dealershipActions.loadDealerships),
      concatMap(() => {
        return this._apiDealershipRepository.getDealerships().pipe(
          map(response => {
            const successResponse = {
              dealerships: dealershipsAdapter(response)
            }

            return dealershipActions.loadDealershipsSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(dealershipActions.loadDealershipsFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles dealership by id thunk.
   */
  dealershipByIdThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(dealershipActions.loadDealership),
      concatMap(({ id }) => {
        return this._apiDealershipRepository.getDealershipById(id).pipe(
          map(response => {
            const successResponse = {
              dealership: dealershipAdapter(response.data)
            }

            return dealershipActions.loadDealershipSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(dealershipActions.loadDealershipFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles create dealership thunk.
   */
  createDealershipThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(dealershipActions.createDealership),
      concatMap(({ dealership }) => {
        return this._apiDealershipRepository.createDealership(dealership).pipe(
          map(() => {
            this._toast.success('¡Excelente! El concesionario se ha creado exitosamente.', 'Concesionario')

            return dealershipActions.createDealershipSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(dealershipActions.createDealershipFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles update dealership thunk.
   */
  updateDealershipThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(dealershipActions.updateDealership),
      concatMap(({ id, dealership }) => {
        return this._apiDealershipRepository.updateDealership(id, dealership).pipe(
          map(() => {
            this._toast.success('¡Excelente! El concesionario se ha actualizado exitosamente.', 'Concesionario')

            return dealershipActions.updateDealershipSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(dealershipActions.updateDealershipFailure(failureResponse))
          })
        )
      })
    )
  })
}
