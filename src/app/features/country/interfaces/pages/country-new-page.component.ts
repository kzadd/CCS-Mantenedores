import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CountryFormContainerComponent } from '../containers/country-form-container.component'
import { CountryHeadingContainerComponent } from '../containers/country-heading-container.component'

/**
 * Country new page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountryFormContainerComponent, CountryHeadingContainerComponent],
  selector: 'app-country-new-page',
  template: `
    <app-country-heading-container mode="new" />
    <app-country-form-container />
  `
})
export class CountryNewPageComponent {}
