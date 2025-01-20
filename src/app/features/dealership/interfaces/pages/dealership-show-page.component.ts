import { ChangeDetectionStrategy, Component } from '@angular/core'

import { DealershipDetailContainerComponent } from '../containers/dealership-detail-container.component'
import { DealershipHeadingContainerComponent } from '../containers/dealership-heading-container.component'

/**
 * Dealership show page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DealershipDetailContainerComponent, DealershipHeadingContainerComponent],
  selector: 'app-dealership-show-page',
  template: `
    <app-dealership-heading-container mode="show" />
    <app-dealership-detail-container />
  `
})
export class DealershipShowPageComponent {}
