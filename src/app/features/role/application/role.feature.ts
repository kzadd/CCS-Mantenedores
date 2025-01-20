import { createFeature, createReducer, on } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { RoleState } from '../domain/role.entity'
import { roleActions } from './role.actions'

const initialState: RoleState = {
  error: null,
  loading: false,
  role: null,
  roles: []
}

const defaultErrorState = (state: RoleState, payload: { error: AppError }): RoleState => ({
  ...state,
  error: payload.error,
  loading: false
})

const defaultLoadingState = (state: RoleState): RoleState => ({
  ...state,
  error: null,
  loading: true
})

/**
 * Feature that manages role related state and actions.
 */
export const roleFeature = createFeature({
  name: 'role',
  reducer: createReducer(
    initialState,
    on(roleActions.clearError, state => ({
      ...state,
      error: null
    })),
    on(roleActions.loadRoles, defaultLoadingState),
    on(roleActions.loadRolesFailure, defaultErrorState),
    on(roleActions.loadRolesSuccess, (state, payload) => ({
      ...state,
      loading: false,
      roles: payload.roles
    })),

    on(roleActions.loadRole, defaultLoadingState),
    on(roleActions.loadRoleFailure, defaultErrorState),
    on(roleActions.loadRoleSuccess, (state, payload) => ({
      ...state,
      loading: false,
      role: payload.role
    })),

    on(roleActions.createRole, defaultLoadingState),
    on(roleActions.createRoleFailure, defaultErrorState),
    on(roleActions.createRoleSuccess, state => ({
      ...state,
      loading: false
    })),

    on(roleActions.updateRole, defaultLoadingState),
    on(roleActions.updateRoleFailure, defaultErrorState),
    on(roleActions.updateRoleSuccess, state => ({
      ...state,
      loading: false
    }))
  )
})
