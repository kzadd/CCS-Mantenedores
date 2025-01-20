import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { Dealership } from '../domain/dealership.entity'

/**
 * Actions for managing dealership data.
 */
export const dealershipActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Create dealership': props<{ dealership: Dealership }>(),
    'Create dealership failure': props<{ error: AppError }>(),
    'Create dealership success': emptyProps(),
    'Load dealership': props<{ id: string }>(),
    'Load dealership failure': props<{ error: AppError }>(),
    'Load dealership success': props<{ dealership: Dealership }>(),
    'Load dealerships': emptyProps(),
    'Load dealerships failure': props<{ error: AppError }>(),
    'Load dealerships success': props<{ dealerships: Dealership[] }>(),
    'Update dealership': props<{ id: string; dealership: Dealership }>(),
    'Update dealership failure': props<{ error: AppError }>(),
    'Update dealership success': emptyProps()
  },
  source: 'Dealership'
})
