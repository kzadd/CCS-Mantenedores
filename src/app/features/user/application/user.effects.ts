import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastrService } from 'ngx-toastr'
import { catchError, concatMap, map, of } from 'rxjs'

import { createError } from '@app/shared/exceptions/create-error.exception'
import { userAdapter, usersAdapter } from '../infrastructure/user.adapter'
import { ApiUserRepository } from '../infrastructure/user.service'
import { userActions } from './user.actions'

@Injectable()
export class UserEffect {
  private _actions = inject(Actions)
  private _apiUserRepository = inject(ApiUserRepository)
  private _toast = inject(ToastrService)

  /**
   * Effect that handles users thunk.
   */
  usersThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(userActions.loadUsers),
      concatMap(() => {
        return this._apiUserRepository.getUsers().pipe(
          map(response => {
            const successResponse = {
              users: usersAdapter(response)
            }

            return userActions.loadUsersSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(userActions.loadUsersFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles user by id thunk.
   */
  userByIdThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(userActions.loadUser),
      concatMap(({ id }) => {
        return this._apiUserRepository.getUserById(id).pipe(
          map(response => {
            const successResponse = {
              user: userAdapter(response.data)
            }

            return userActions.loadUserSuccess(successResponse)
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(userActions.loadUserFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles create user thunk.
   */
  createUserThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(userActions.createUser),
      concatMap(({ user }) => {
        return this._apiUserRepository.createUser(user).pipe(
          map(() => {
            this._toast.success('¡Excelente! El usuario se ha creado exitosamente.', 'Usuario')

            return userActions.createUserSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(userActions.createUserFailure(failureResponse))
          })
        )
      })
    )
  })

  /**
   * Effect that handles update user thunk.
   */
  updateUserThunk$ = createEffect(() => {
    return this._actions.pipe(
      ofType(userActions.updateUser),
      concatMap(({ id, user }) => {
        return this._apiUserRepository.updateUser(id, user).pipe(
          map(() => {
            this._toast.success('¡Excelente! El usuario se ha actualizado exitosamente.', 'Usuario')

            return userActions.updateUserSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            const failureResponse = {
              error: createError({
                originalError: error,
                reason: 'SOMETHING_WENT_WRONG_ERROR'
              }).toObject()
            }

            return of(userActions.updateUserFailure(failureResponse))
          })
        )
      })
    )
  })
}
