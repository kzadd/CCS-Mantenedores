import { ChangeDetectionStrategy, Component } from '@angular/core'

import { DealershipFormContainerComponent } from '../containers/dealership-form/dealership-form-container.component'
import { DealershipHeadingContainerComponent } from '../containers/dealership-heading-container.component'

/**
 * Dealership new page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DealershipFormContainerComponent, DealershipHeadingContainerComponent],
  selector: 'app-dealership-new-page',
  template: `
    <app-dealership-heading-container mode="new" />
    <app-dealership-form-container mode="new" />
  `
})
export class DealershipNewPageComponent {}
