import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const UserEditPage = () => import('./interfaces/pages/user-edit-page.component').then(m => m.UserEditPageComponent)
const UserListPage = () => import('./interfaces/pages/user-list-page.component').then(m => m.UserListPageComponent)
const UserNewPage = () => import('./interfaces/pages/user-new-page.component').then(m => m.UserNewPageComponent)
const UserShowPage = () => import('./interfaces/pages/user-show-page.component').then(m => m.UserShowPageComponent)

/**
 * User routes configuration.
 */
export const userRoutes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.list
      },
      {
        loadComponent: UserEditPage,
        path: ROUTE_PATHS.edit
      },
      {
        loadComponent: UserListPage,
        path: ROUTE_PATHS.list
      },
      {
        loadComponent: UserNewPage,
        path: ROUTE_PATHS.new
      },
      {
        loadComponent: UserShowPage,
        path: ROUTE_PATHS.show
      }
    ],
    path: ROUTE_PATHS.user
  }
]
