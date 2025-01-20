import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { FunctionalityState } from '../domain/functionality.entity'
import { functionalityActions } from './functionality.actions'

const initialState: FunctionalityState = {
  error: null,
  functionalities: [],
  functionality: null,
  loading: false
}

const defaultErrorState = (state: FunctionalityState, payload: { error: AppError }): FunctionalityState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: FunctionalityState): FunctionalityState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages functionality related state and actions.
 */
export const functionalityFeature = createFeature({
  name: 'functionality',
  reducer: createReducer(
    initialState,
    on(functionalityActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(functionalityActions.loadFunctionalities, defaultLoadingState),
    on(functionalityActions.loadFunctionalitiesFailure, defaultErrorState),
    on(functionalityActions.loadFunctionalitiesSuccess, (state, payload) => ({
      ...state,
      functionalities: payload.functionalities,
      loading: false
    })),

    on(functionalityActions.loadFunctionality, defaultLoadingState),
    on(functionalityActions.loadFunctionalityFailure, defaultErrorState),
    on(functionalityActions.loadFunctionalitySuccess, (state, payload) => ({
      ...state,
      functionality: payload.functionality,
      loading: false
    })),

    on(functionalityActions.createFunctionality, defaultLoadingState),
    on(functionalityActions.createFunctionalityFailure, defaultErrorState),
    on(functionalityActions.createFunctionalitySuccess, state => ({
      ...state,
      loading: false
    })),

    on(functionalityActions.updateFunctionality, defaultLoadingState),
    on(functionalityActions.updateFunctionalityFailure, defaultErrorState),
    on(functionalityActions.updateFunctionalitySuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
