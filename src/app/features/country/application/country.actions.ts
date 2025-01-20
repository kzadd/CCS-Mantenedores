import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { Country } from '../domain/country.entity'

/**
 * Actions for managing country data.
 */
export const countryActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Create country': props<{ country: Country }>(),
    'Create country failure': props<{ error: AppError }>(),
    'Create country success': emptyProps(),
    'Load countries': emptyProps(),
    'Load countries failure': props<{ error: AppError }>(),
    'Load countries success': props<{ countries: Country[] }>(),
    'Load country': props<{ id: string }>(),
    'Load country failure': props<{ error: AppError }>(),
    'Load country success': props<{ country: Country }>(),
    'Update country': props<{ id: string; country: Country }>(),
    'Update country failure': props<{ error: AppError }>(),
    'Update country success': emptyProps()
  },
  source: 'Country'
})
