import { ChangeDetectionStrategy, Component } from '@angular/core'

import { UserDetailContainerComponent } from '../containers/user-detail-container.component'
import { UserHeadingContainerComponent } from '../containers/user-heading-container.component'

/**
 * User show page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserDetailContainerComponent, UserHeadingContainerComponent],
  selector: 'app-user-show-page',
  template: `
    <app-user-heading-container mode="show" />
    <app-user-detail-container />
  `
})
export class UserShowPageComponent {}
