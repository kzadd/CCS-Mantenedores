import { ChangeDetectionStrategy, Component } from '@angular/core'

import { UserHeadingContainerComponent } from '../containers/user-heading-container.component'
import { UserTableContainerComponent } from '../containers/user-table-container.component'

/**
 * User list page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserHeadingContainerComponent, UserTableContainerComponent],
  selector: 'app-user-list-page',
  template: `
    <app-user-heading-container mode="list" />
    <app-user-table-container />
  `
})
export class UserListPageComponent {}
