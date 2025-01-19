import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { CountryState } from '../domain/country.entity'
import { countryActions } from './country.actions'

const initialState: CountryState = {
  countries: [],
  country: null,
  error: null,
  loading: false
}

const defaultErrorState = (state: CountryState, payload: { error: AppError }): CountryState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: CountryState): CountryState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages country related state and actions.
 */
export const countryFeature = createFeature({
  name: 'country',
  reducer: createReducer(
    initialState,
    on(countryActions.loadCountries, defaultLoadingState),
    on(countryActions.loadCountriesFailure, defaultErrorState),
    on(countryActions.loadCountriesSuccess, (state, payload) => ({
      ...state,
      countries: payload.countries,
      loading: false
    })),

    on(countryActions.loadCountry, defaultLoadingState),
    on(countryActions.loadCountryFailure, defaultErrorState),
    on(countryActions.loadCountrySuccess, (state, payload) => ({
      ...state,
      country: payload.country,
      loading: false
    })),

    on(countryActions.createCountry, defaultLoadingState),
    on(countryActions.createCountryFailure, defaultErrorState),
    on(countryActions.createCountrySuccess, state => ({
      ...state,
      loading: false
    })),

    on(countryActions.updateCountry, defaultLoadingState),
    on(countryActions.updateCountryFailure, defaultErrorState),
    on(countryActions.updateCountrySuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
