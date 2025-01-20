import { ChangeDetectionStrategy, Component } from '@angular/core'

import { DealershipHeadingContainerComponent } from '../containers/dealership-heading-container.component'
import { DealershipTableContainerComponent } from '../containers/dealership-table-container.component'

/**
 * Dealership list page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DealershipHeadingContainerComponent, DealershipTableContainerComponent],
  selector: 'app-dealership-list-page',
  template: `
    <app-dealership-heading-container mode="list" />
    <app-dealership-table-container />
  `
})
export class DealershipListPageComponent {}
