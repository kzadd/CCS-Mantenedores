import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { countriesAdapter, countryAdapter } from '../infrastructure/country.adapter'
import { ApiCountryRepository } from '../infrastructure/country.service'
import { countryActions } from './country.actions'

@Injectable()
export class CountryEffect {
  private _actions = inject(Actions)
  private _apiCountryRepository = inject(ApiCountryRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles countries thunk.
   */
  countriesThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(countryActions.loadCountries),
      concatMap(() => {
        return this._apiCountryRepository.getCountries().pipe(
          map(response => {
            const successResponse = {
              countries: countriesAdapter(response)
            }

            return countryActions.loadCountriesSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(countryActions.loadCountriesFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles country by id thunk.
   */
  countryByIdThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(countryActions.loadCountry),
      concatMap(({ id }) => {
        return this._apiCountryRepository.getCountryById(id).pipe(
          map(response => {
            const successResponse = {
              country: countryAdapter(response.data)
            }

            return countryActions.loadCountrySuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(countryActions.loadCountryFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles create country thunk.
   */
  createCountryThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(countryActions.createCountry),
      concatMap(({ country }) => {
        return this._apiCountryRepository.createCountry(country).pipe(
          map(() => {
            this._toast.success('El país ha sido agregado exitosamente.', 'País')

            return countryActions.createCountrySuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(countryActions.createCountryFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles update country thunk.
   */
  updateCountryThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(countryActions.updateCountry),
      concatMap(({ id, country }) => {
        return this._apiCountryRepository.updateCountry(id, country).pipe(
          map(() => {
            this._toast.success('El país ha sido actualizado exitosamente.', 'País')

            return countryActions.updateCountrySuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(countryActions.updateCountryFailure(failureResponse))
          })
        )
      })
    )
  })
}
