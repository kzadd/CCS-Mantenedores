import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { AppError } from '@app/shared/types/exception.types'
import { Company } from '../domain/company.entity'

/**
 * Actions for managing company data.
 */
export const companyActions = createActionGroup({
  events: {
    'Clear error': emptyProps(),
    'Create company': props<{ company: Company }>(),
    'Create company failure': props<{ error: AppError }>(),
    'Create company success': emptyProps(),
    'Load companies': emptyProps(),
    'Load companies failure': props<{ error: AppError }>(),
    'Load companies success': props<{ companies: Company[] }>(),
    'Load company': props<{ id: string }>(),
    'Load company failure': props<{ error: AppError }>(),
    'Load company success': props<{ company: Company }>(),
    'Update company': props<{ id: string; company: Company }>(),
    'Update company failure': props<{ error: AppError }>(),
    'Update company success': emptyProps()
  },
  source: 'Company'
})
