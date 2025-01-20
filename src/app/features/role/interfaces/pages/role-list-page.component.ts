import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RoleHeadingContainerComponent } from '../containers/role-heading-container.component'
import { RoleTableContainerComponent } from '../containers/role-table-container.component'

/**
 * Role list page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleHeadingContainerComponent, RoleTableContainerComponent],
  selector: 'app-role-list-page',
  template: `
    <app-role-heading-container mode="list" />
    <app-role-table-container />
  `
})
export class RoleListPageComponent {}
