import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { Functionality } from '../domain/functionality.entity'

/**
 * Actions for managing functionality data.
 */
export const functionalityActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Create functionality': props<{ functionality: Functionality }>(),
    'Create functionality failure': props<{ error: AppError }>(),
    'Create functionality success': emptyProps(),
    'Load functionalities': emptyProps(),
    'Load functionalities failure': props<{ error: AppError }>(),
    'Load functionalities success': props<{ functionalities: Functionality[] }>(),
    'Load functionality': props<{ id: string }>(),
    'Load functionality failure': props<{ error: AppError }>(),
    'Load functionality success': props<{ functionality: Functionality }>(),
    'Update functionality': props<{ id: string; functionality: Functionality }>(),
    'Update functionality failure': props<{ error: AppError }>(),
    'Update functionality success': emptyProps()
  },
  source: 'Functionality'
})
