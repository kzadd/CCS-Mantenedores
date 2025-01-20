import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RoleFormContainerComponent } from '../containers/role-form/role-form-container.component'
import { RoleHeadingContainerComponent } from '../containers/role-heading-container.component'

/**
 * Role edit page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleFormContainerComponent, RoleHeadingContainerComponent],
  selector: 'app-role-edit-page',
  template: `
    <app-role-heading-container mode="edit" />
    <app-role-form-container mode="edit" />
  `
})
export class RoleEditPageComponent {}
