import { environment } from '@env/environment'

/**
 * Environment configuration that manages API URLs and environment settings.
 */
export const env = {
  API_URL: environment?.API_URL ?? '',
  API_URL_GAM: environment?.API_URL_GAM ?? '',
  IS_MOCKING_ENABLED: environment?.IS_MOCKING_ENABLED ?? 'false',
  MODE: environment?.MODE ?? 'local',
  ROOT_URL: environment?.ROOT_URL ?? '/'
}
