import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { roleAdapter, rolesAdapter } from '../infrastructure/role.adapter'
import { ApiRoleRepository } from '../infrastructure/role.service'
import { roleActions } from './role.actions'

@Injectable()
export class RoleEffect {
  private _actions = inject(Actions)
  private _apiRoleRepository = inject(ApiRoleRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles roles thunk.
   */
  rolesThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(roleActions.loadRoles),
      concatMap(() => {
        return this._apiRoleRepository.getRoles().pipe(
          map(response => {
            const successResponse = {
              roles: rolesAdapter(response)
            }

            return roleActions.loadRolesSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(roleActions.loadRolesFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles role by id thunk.
   */
  roleByIdThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(roleActions.loadRole),
      concatMap(({ id }) => {
        return this._apiRoleRepository.getRoleById(id).pipe(
          map(response => {
            const successResponse = {
              role: roleAdapter(response.data)
            }

            return roleActions.loadRoleSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(roleActions.loadRoleFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles create role thunk.
   */
  createRoleThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(roleActions.createRole),
      concatMap(({ role }) => {
        return this._apiRoleRepository.createRole(role).pipe(
          map(() => {
            this._toast.success('¡Excelente! El rol se ha creado exitosamente.', 'Rol')

            return roleActions.createRoleSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(roleActions.createRoleFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles update role thunk.
   */
  updateRoleThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(roleActions.updateRole),
      concatMap(({ id, role }) => {
        return this._apiRoleRepository.updateRole(id, role).pipe(
          map(() => {
            this._toast.success('¡Excelente! El rol se ha actualizado exitosamente.', 'Rol')

            return roleActions.updateRoleSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(roleActions.updateRoleFailure(failureResponse))
          })
        )
      })
    )
  })
}
