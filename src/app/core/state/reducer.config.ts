import { countryFeature } from '@app/features/country'

/**
 * Root reducer that combines all feature reducers into a single state tree.
 * Manages the entire application state through NgRx store.
 */
export const reducer = {
  [countryFeature.name]: countryFeature.reducer
}
