import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RoleFormContainerComponent } from '../containers/role-form/role-form-container.component'
import { RoleHeadingContainerComponent } from '../containers/role-heading-container.component'

/**
 * Role new page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleFormContainerComponent, RoleHeadingContainerComponent],
  selector: 'app-role-new-page',
  template: `
    <app-role-heading-container mode="new" />
    <app-role-form-container mode="new" />
  `
})
export class RoleNewPageComponent {}
