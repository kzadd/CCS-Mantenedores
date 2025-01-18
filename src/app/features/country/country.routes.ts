import { Routes } from '@angular/router'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const CountryEditPage = () =>
  import('./interfaces/pages/country-edit-page.component').then(m => m.CountryEditPageComponent)

const CountryListPage = () =>
  import('./interfaces/pages/country-list-page.component').then(m => m.CountryListPageComponent)

const CountryNewPage = () =>
  import('./interfaces/pages/country-new-page.component').then(m => m.CountryNewPageComponent)

const CountryShowPage = () =>
  import('./interfaces/pages/country-show-page.component').then(m => m.CountryShowPageComponent)

/**
 * Country routes configuration.
 */
export const countryRoutes: Routes = [
  {
    children: [
      { path: ROUTE_PATHS.root, pathMatch: 'full', redirectTo: ROUTE_PATHS.list },
      {
        loadComponent: CountryEditPage,
        path: ROUTE_PATHS.edit
      },
      {
        loadComponent: CountryListPage,
        path: ROUTE_PATHS.list
      },
      {
        loadComponent: CountryNewPage,
        path: ROUTE_PATHS.new
      },
      {
        loadComponent: CountryShowPage,
        path: ROUTE_PATHS.show
      }
    ],
    path: ROUTE_PATHS.country
  }
]
