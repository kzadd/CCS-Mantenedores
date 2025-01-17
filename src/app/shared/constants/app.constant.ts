import { ROUTE_PATHS } from './routes.constant'

export const DEFAULT_CREDENTIALS = {
  password: '123456',
  username: 'kzadd'
}

export const FULL_ROUTE_PATHS = {
  auth: {
    login: `/${ROUTE_PATHS.auth}/${ROUTE_PATHS.login}`
  },
  dashboard: {
    root: `/${ROUTE_PATHS.dashboard}`
  }
}

export const TOKEN_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token'
}

export const TOKENS = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoia3phZGQiLCJyb2xlcyI6W10sImlhdCI6MTczNjk1MzY1NiwiZXhwIjoxNzM3MDQwMDU2fQ.r13HuxiRPZWCgwbiBL3QzI3xP0uD98lAsWimroPVXPA',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoia3phZGQiLCJyb2xlcyI6W10sImlhdCI6MTczNjk1MzY1NiwiZXhwIjoxNzM3NTU4NDU2fQ.O0K8_JxjzVI_Fp580UtPJdks21c9T2AUSje-8fP1wfY'
}
