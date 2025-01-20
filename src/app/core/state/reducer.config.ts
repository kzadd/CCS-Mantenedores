import { companyFeature } from '@app/features/company'
import { countryFeature } from '@app/features/country'
import { dealershipFeature } from '@app/features/dealership'
import { functionalityFeature } from '@app/features/functionality'
import { roleFeature } from '@app/features/role'
import { userFeature } from '@app/features/user'

/**
 * Root reducer that combines all feature reducers into a single state tree.
 * Manages the entire application state through NgRx store.
 */
export const reducer = {
  [companyFeature.name]: companyFeature.reducer,
  [countryFeature.name]: countryFeature.reducer,
  [dealershipFeature.name]: dealershipFeature.reducer,
  [functionalityFeature.name]: functionalityFeature.reducer,
  [roleFeature.name]: roleFeature.reducer,
  [userFeature.name]: userFeature.reducer
}
