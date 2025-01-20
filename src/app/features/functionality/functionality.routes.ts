import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const FunctionalityEditPage = () =>
  import('./interfaces/pages/functionality-edit-page.component').then(m => m.FunctionalityEditPageComponent)

const FunctionalityListPage = () =>
  import('./interfaces/pages/functionality-list-page.component').then(m => m.FunctionalityListPageComponent)

const FunctionalityNewPage = () =>
  import('./interfaces/pages/functionality-new-page.component').then(m => m.FunctionalityNewPageComponent)

const FunctionalityShowPage = () =>
  import('./interfaces/pages/functionality-show-page.component').then(m => m.FunctionalityShowPageComponent)

/**
 * Functionality routes configuration.
 */
export const functionalityRoutes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.list
      },
      {
        loadComponent: FunctionalityEditPage,
        path: ROUTE_PATHS.edit
      },
      {
        loadComponent: FunctionalityListPage,
        path: ROUTE_PATHS.list
      },
      {
        loadComponent: FunctionalityNewPage,
        path: ROUTE_PATHS.new
      },
      {
        loadComponent: FunctionalityShowPage,
        path: ROUTE_PATHS.show
      }
    ],
    path: ROUTE_PATHS.functionality
  }
]
