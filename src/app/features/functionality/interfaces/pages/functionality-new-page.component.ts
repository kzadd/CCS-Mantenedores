import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FunctionalityFormContainerComponent } from '../containers/functionality-form/functionality-form-container.component'
import { FunctionalityHeadingContainerComponent } from '../containers/functionality-heading-container.component'

/**
 * Functionality new page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FunctionalityFormContainerComponent, FunctionalityHeadingContainerComponent],
  selector: 'app-functionality-new-page',
  template: `
    <app-functionality-heading-container mode="new" />
    <app-functionality-form-container mode="new" />
  `
})
export class FunctionalityNewPageComponent {}
