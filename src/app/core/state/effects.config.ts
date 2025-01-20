import { CompanyEffect } from '@app/features/company'
import { CountryEffect } from '@app/features/country'
import { DealershipEffect } from '@app/features/dealership'
import { FunctionalityEffect } from '@app/features/functionality'
import { RoleEffect } from '@app/features/role'
import { UserEffect } from '@app/features/user'

/**
 * Root effects array for NgRx state management.
 * Handles side effects like API calls and async operations.
 */
export const effects = [CompanyEffect, CountryEffect, DealershipEffect, FunctionalityEffect, RoleEffect, UserEffect]
