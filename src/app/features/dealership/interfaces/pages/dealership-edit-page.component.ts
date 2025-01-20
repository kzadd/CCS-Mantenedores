import { ChangeDetectionStrategy, Component } from '@angular/core'

import { DealershipFormContainerComponent } from '../containers/dealership-form/dealership-form-container.component'
import { DealershipHeadingContainerComponent } from '../containers/dealership-heading-container.component'

/**
 * Dealership edit page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DealershipFormContainerComponent, DealershipHeadingContainerComponent],
  selector: 'app-dealership-edit-page',
  template: `
    <app-dealership-heading-container mode="edit" />
    <app-dealership-form-container mode="edit" />
  `
})
export class DealershipEditPageComponent {}
