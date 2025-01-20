import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const RoleEditPage = () => import('./interfaces/pages/role-edit-page.component').then(m => m.RoleEditPageComponent)
const RoleListPage = () => import('./interfaces/pages/role-list-page.component').then(m => m.RoleListPageComponent)
const RoleNewPage = () => import('./interfaces/pages/role-new-page.component').then(m => m.RoleNewPageComponent)
const RoleShowPage = () => import('./interfaces/pages/role-show-page.component').then(m => m.RoleShowPageComponent)

/**
 * Role routes configuration.
 */
export const roleRoutes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.list
      },
      {
        loadComponent: RoleEditPage,
        path: ROUTE_PATHS.edit
      },
      {
        loadComponent: RoleListPage,
        path: ROUTE_PATHS.list
      },
      {
        loadComponent: RoleNewPage,
        path: ROUTE_PATHS.new
      },
      {
        loadComponent: RoleShowPage,
        path: ROUTE_PATHS.show
      }
    ],
    path: ROUTE_PATHS.role
  }
]
