import { ROUTE_PATHS } from './routes.constant'

export const DEFAULT_CREDENTIALS = {
  password: '123456',
  username: 'kzadd'
}

export const FULL_ROUTE_PATHS = {
  auth: {
    login: `/${ROUTE_PATHS.auth}/${ROUTE_PATHS.login}`
  },
  company: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.company}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.company}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.company}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.company}/${ROUTE_PATHS.show}`
  },
  country: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.country}/${ROUTE_PATHS.show}`
  },
  dashboard: {
    root: `/${ROUTE_PATHS.dashboard}`
  },
  dealership: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.dealership}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.dealership}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.dealership}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.dealership}/${ROUTE_PATHS.show}`
  },
  functionality: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.functionality}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.functionality}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.functionality}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.functionality}/${ROUTE_PATHS.show}`
  },
  role: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.role}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.role}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.role}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.role}/${ROUTE_PATHS.show}`
  },
  user: {
    edit: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.user}/${ROUTE_PATHS.edit}`,
    list: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.user}/${ROUTE_PATHS.list}`,
    new: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.user}/${ROUTE_PATHS.new}`,
    show: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.user}/${ROUTE_PATHS.show}`
  }
}

export const TOKEN_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token'
}

export const TOKENS = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
}
