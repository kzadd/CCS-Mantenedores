import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FunctionalityHeadingContainerComponent } from '../containers/functionality-heading-container.component'
import { FunctionalityTableContainerComponent } from '../containers/functionality-table-container.component'

/**
 * Functionality list page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FunctionalityHeadingContainerComponent, FunctionalityTableContainerComponent],
  selector: 'app-functionality-list-page',
  template: `
    <app-functionality-heading-container mode="list" />
    <app-functionality-table-container />
  `
})
export class FunctionalityListPageComponent {}
