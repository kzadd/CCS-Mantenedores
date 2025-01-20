import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { functionalitiesAdapter, functionalityAdapter } from '../infrastructure/functionality.adapter'
import { ApiFunctionalityRepository } from '../infrastructure/functionality.service'
import { functionalityActions } from './functionality.actions'

@Injectable()
export class FunctionalityEffect {
  private _actions = inject(Actions)
  private _apiFunctionalityRepository = inject(ApiFunctionalityRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles functionalities thunk.
   */
  functionalitiesThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(functionalityActions.loadFunctionalities),
      concatMap(() => {
        return this._apiFunctionalityRepository.getFunctionalities().pipe(
          map(response => {
            const successResponse = {
              functionalities: functionalitiesAdapter(response)
            }

            return functionalityActions.loadFunctionalitiesSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(functionalityActions.loadFunctionalitiesFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles functionality by id thunk.
   */
  functionalityByIdThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(functionalityActions.loadFunctionality),
      concatMap(({ id }) => {
        return this._apiFunctionalityRepository.getFunctionalityById(id).pipe(
          map(response => {
            const successResponse = {
              functionality: functionalityAdapter(response.data)
            }

            return functionalityActions.loadFunctionalitySuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(functionalityActions.loadFunctionalityFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles create functionality thunk.
   */
  createFunctionalityThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(functionalityActions.createFunctionality),
      concatMap(({ functionality }) => {
        return this._apiFunctionalityRepository.createFunctionality(functionality).pipe(
          map(() => {
            this._toast.success('¡Excelente! La funcionalidad se ha creado exitosamente.', 'Funcionalidad')

            return functionalityActions.createFunctionalitySuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(functionalityActions.createFunctionalityFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles update functionality thunk.
   */
  updateFunctionalityThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(functionalityActions.updateFunctionality),
      concatMap(({ id, functionality }) => {
        return this._apiFunctionalityRepository.updateFunctionality(id, functionality).pipe(
          map(() => {
            this._toast.success('¡Excelente! La funcionalidad se ha actualizado exitosamente.', 'Funcionalidad')

            return functionalityActions.updateFunctionalitySuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(functionalityActions.updateFunctionalityFailure(failureResponse))
          })
        )
      })
    )
  })
}
