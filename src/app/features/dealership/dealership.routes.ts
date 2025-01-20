import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const DealershipEditPage = () =>
  import('./interfaces/pages/dealership-edit-page.component').then(m => m.DealershipEditPageComponent)

const DealershipListPage = () =>
  import('./interfaces/pages/dealership-list-page.component').then(m => m.DealershipListPageComponent)

const DealershipNewPage = () =>
  import('./interfaces/pages/dealership-new-page.component').then(m => m.DealershipNewPageComponent)

const DealershipShowPage = () =>
  import('./interfaces/pages/dealership-show-page.component').then(m => m.DealershipShowPageComponent)

/**
 * Dealership routes configuration.
 */
export const dealershipRoutes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.list
      },
      {
        loadComponent: DealershipEditPage,
        path: ROUTE_PATHS.edit
      },
      {
        loadComponent: DealershipListPage,
        path: ROUTE_PATHS.list
      },
      {
        loadComponent: DealershipNewPage,
        path: ROUTE_PATHS.new
      },
      {
        loadComponent: DealershipShowPage,
        path: ROUTE_PATHS.show
      }
    ],
    path: ROUTE_PATHS.dealership
  }
]
