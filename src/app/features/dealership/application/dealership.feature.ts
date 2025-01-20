import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { DealershipState } from '../domain/dealership.entity'
import { dealershipActions } from './dealership.actions'

const initialState: DealershipState = {
  dealership: null,
  dealerships: [],
  error: null,
  loading: false
}

const defaultErrorState = (state: DealershipState, payload: { error: AppError }): DealershipState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: DealershipState): DealershipState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages dealership related state and actions.
 */
export const dealershipFeature = createFeature({
  name: 'dealership',
  reducer: createReducer(
    initialState,
    on(dealershipActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(dealershipActions.loadDealerships, defaultLoadingState),
    on(dealershipActions.loadDealershipsFailure, defaultErrorState),
    on(dealershipActions.loadDealershipsSuccess, (state, payload) => ({
      ...state,
      dealerships: payload.dealerships,
      loading: false
    })),

    on(dealershipActions.loadDealership, defaultLoadingState),
    on(dealershipActions.loadDealershipFailure, defaultErrorState),
    on(dealershipActions.loadDealershipSuccess, (state, payload) => ({
      ...state,
      dealership: payload.dealership,
      loading: false
    })),

    on(dealershipActions.createDealership, defaultLoadingState),
    on(dealershipActions.createDealershipFailure, defaultErrorState),
    on(dealershipActions.createDealershipSuccess, state => ({
      ...state,
      loading: false
    })),

    on(dealershipActions.updateDealership, defaultLoadingState),
    on(dealershipActions.updateDealershipFailure, defaultErrorState),
    on(dealershipActions.updateDealershipSuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
