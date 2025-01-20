import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FunctionalityDetailContainerComponent } from '../containers/functionality-detail-container.component'
import { FunctionalityHeadingContainerComponent } from '../containers/functionality-heading-container.component'

/**
 * Functionality show page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FunctionalityDetailContainerComponent, FunctionalityHeadingContainerComponent],
  selector: 'app-functionality-show-page',
  template: `
    <app-functionality-heading-container mode="show" />
    <app-functionality-detail-container />
  `
})
export class FunctionalityShowPageComponent {}
