import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FunctionalityFormContainerComponent } from '../containers/functionality-form/functionality-form-container.component'
import { FunctionalityHeadingContainerComponent } from '../containers/functionality-heading-container.component'

/**
 * Functionality edit page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FunctionalityFormContainerComponent, FunctionalityHeadingContainerComponent],
  selector: 'app-functionality-edit-page',
  template: `
    <app-functionality-heading-container mode="edit" />
    <app-functionality-form-container mode="edit" />
  `
})
export class FunctionalityEditPageComponent {}
