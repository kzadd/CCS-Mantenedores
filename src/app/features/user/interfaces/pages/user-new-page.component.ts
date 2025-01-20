import { ChangeDetectionStrategy, Component } from '@angular/core'

import { UserFormContainerComponent } from '../containers/user-form/user-form-container.component'
import { UserHeadingContainerComponent } from '../containers/user-heading-container.component'

/**
 * User new page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormContainerComponent, UserHeadingContainerComponent],
  selector: 'app-user-new-page',
  template: `
    <app-user-heading-container mode="new" />
    <app-user-form-container mode="new" />
  `
})
export class UserNewPageComponent {}
