import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { UserState } from '../domain/user.entity'
import { userActions } from './user.actions'

const initialState: UserState = {
  error: null,
  loading: false,
  user: null,
  users: []
}

const defaultErrorState = (state: UserState, payload: { error: AppError }): UserState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: UserState): UserState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages user related state and actions.
 */
export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(userActions.loadUsers, defaultLoadingState),
    on(userActions.loadUsersFailure, defaultErrorState),
    on(userActions.loadUsersSuccess, (state, payload) => ({
      ...state,
      loading: false,
      users: payload.users
    })),

    on(userActions.loadUser, defaultLoadingState),
    on(userActions.loadUserFailure, defaultErrorState),
    on(userActions.loadUserSuccess, (state, payload) => ({
      ...state,
      loading: false,
      user: payload.user
    })),

    on(userActions.createUser, defaultLoadingState),
    on(userActions.createUserFailure, defaultErrorState),
    on(userActions.createUserSuccess, state => ({
      ...state,
      loading: false
    })),

    on(userActions.updateUser, defaultLoadingState),
    on(userActions.updateUserFailure, defaultErrorState),
    on(userActions.updateUserSuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
