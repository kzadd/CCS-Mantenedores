import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const CompanyEditPage = () =>
  import('./interfaces/pages/company-edit-page.component').then(m => m.CompanyEditPageComponent)

const CompanyListPage = () =>
  import('./interfaces/pages/company-list-page.component').then(m => m.CompanyListPageComponent)

const CompanyNewPage = () =>
  import('./interfaces/pages/company-new-page.component').then(m => m.CompanyNewPageComponent)

const CompanyShowPage = () =>
  import('./interfaces/pages/company-show-page.component').then(m => m.CompanyShowPageComponent)

/**
 * Company routes configuration.
 */
export const companyRoutes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.list
      },
      {
        loadComponent: CompanyEditPage,
        path: ROUTE_PATHS.edit
      },
      {
        loadComponent: CompanyListPage,
        path: ROUTE_PATHS.list
      },
      {
        loadComponent: CompanyNewPage,
        path: ROUTE_PATHS.new
      },
      {
        loadComponent: CompanyShowPage,
        path: ROUTE_PATHS.show
      }
    ],
    path: ROUTE_PATHS.company
  }
]
