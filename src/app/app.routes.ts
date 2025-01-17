import { Routes } from '@angular/router'

import { authGuard } from './core/guards/auth.guard'
import { ROUTE_PATHS } from './shared/constants/routes.constant'

const BrandLayout = () => import('./layouts/brand-layout.component').then(m => m.BrandLayoutComponent)
const DashboardPage = () => import('./features/dashboard').then(m => m.DashboardPage)
const LoginPage = () => import('./features/login').then(m => m.LoginPage)
const NotFoundPage = () => import('./features/not-found').then(m => m.NotFoundPage)

/**
 * Main application routes configuration.
 * Defines public and protected routes with their respective guards and components.
 */
export const routes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.login
      },
      {
        loadComponent: LoginPage,
        path: ROUTE_PATHS.login
      }
    ],
    path: ROUTE_PATHS.auth
  },
  {
    path: ROUTE_PATHS.root,
    pathMatch: 'full',
    redirectTo: ROUTE_PATHS.dashboard
  },
  {
    canActivate: [authGuard],
    children: [
      {
        loadComponent: DashboardPage,
        path: ROUTE_PATHS.root,
        pathMatch: 'full'
      }
    ],
    loadComponent: BrandLayout,
    path: ROUTE_PATHS.dashboard
  },
  {
    loadComponent: NotFoundPage,
    path: ROUTE_PATHS.notFound
  }
]
