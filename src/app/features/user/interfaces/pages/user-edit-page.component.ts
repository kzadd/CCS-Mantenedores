import { ChangeDetectionStrategy, Component } from '@angular/core'

import { UserFormContainerComponent } from '../containers/user-form/user-form-container.component'
import { UserHeadingContainerComponent } from '../containers/user-heading-container.component'

/**
 * User edit page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormContainerComponent, UserHeadingContainerComponent],
  selector: 'app-user-edit-page',
  template: `
    <app-user-heading-container mode="edit" />
    <app-user-form-container mode="edit" />
  `
})
export class UserEditPageComponent {}
