import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CountryDetailContainerComponent } from '../containers/country-detail-container.component'
import { CountryHeadingContainerComponent } from '../containers/country-heading-container.component'

/**
 * Country show page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountryDetailContainerComponent, CountryHeadingContainerComponent],
  selector: 'app-country-show-page',
  template: `
    <app-country-heading-container mode="show" />
    <app-country-detail-container />
  `
})
export class CountryShowPageComponent {}
