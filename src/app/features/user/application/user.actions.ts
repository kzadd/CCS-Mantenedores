import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { User } from '../domain/user.entity'

/**
 * Actions for managing user data.
 */
export const userActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Create user': props<{ user: User }>(),
    'Create user failure': props<{ error: AppError }>(),
    'Create user success': emptyProps(),
    'Load user': props<{ id: string }>(),
    'Load user failure': props<{ error: AppError }>(),
    'Load user success': props<{ user: User }>(),
    'Load users': emptyProps(),
    'Load users failure': props<{ error: AppError }>(),
    'Load users success': props<{ users: User[] }>(),
    'Update user': props<{ id: string; user: User }>(),
    'Update user failure': props<{ error: AppError }>(),
    'Update user success': emptyProps()
  },
  source: 'User'
})
