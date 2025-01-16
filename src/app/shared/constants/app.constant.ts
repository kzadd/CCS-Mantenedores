import { ROUTE_PATHS } from './routes.constant'

export enum DEFAULT_CREDENTIALS {
  LOGIN = '123456',
  USERNAME = 'kzadd'
}

export const FULL_ROUTE_PATHS = {
  AUTH: {
    LOGIN: `/${ROUTE_PATHS.AUTH}/${ROUTE_PATHS.LOGIN}`
  },
  DASHBOARD: {
    ROOT: `/${ROUTE_PATHS.DASHBOARD}`
  }
}

export enum TOKEN_KEYS {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token'
}
