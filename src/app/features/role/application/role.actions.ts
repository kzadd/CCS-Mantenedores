import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { Role } from '../domain/role.entity'

/**
 * Actions for managing role data.
 */
export const roleActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Create role': props<{ role: Role }>(),
    'Create role failure': props<{ error: AppError }>(),
    'Create role success': emptyProps(),
    'Load role': props<{ id: string }>(),
    'Load role failure': props<{ error: AppError }>(),
    'Load role success': props<{ role: Role }>(),
    'Load roles': emptyProps(),
    'Load roles failure': props<{ error: AppError }>(),
    'Load roles success': props<{ roles: Role[] }>(),
    'Update role': props<{ id: string; role: Role }>(),
    'Update role failure': props<{ error: AppError }>(),
    'Update role success': emptyProps()
  },
  source: 'Role'
})
