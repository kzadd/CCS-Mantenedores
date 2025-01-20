import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RoleDetailContainerComponent } from '../containers/role-detail-container.component'
import { RoleHeadingContainerComponent } from '../containers/role-heading-container.component'

/**
 * Role show page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleDetailContainerComponent, RoleHeadingContainerComponent],
  selector: 'app-role-show-page',
  template: `
    <app-role-heading-container mode="show" />
    <app-role-detail-container />
  `
})
export class RoleShowPageComponent {}
