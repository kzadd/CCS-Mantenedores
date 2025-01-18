import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CountryHeadingContainerComponent } from '../containers/country-heading-container.component'
import { CountryTableContainerComponent } from '../containers/country-table-container.component'

/**
 * Country list page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountryHeadingContainerComponent, CountryTableContainerComponent],
  selector: 'app-country-list-page',
  template: `
    <app-country-heading-container mode="list" />
    <app-country-table-container />
  `
})
export class CountryListPageComponent {}
