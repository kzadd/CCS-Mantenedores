import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CompanyFormContainerComponent } from '../containers/company-form/company-form-container.component'
import { CompanyHeadingContainerComponent } from '../containers/company-heading-container.component'

/**
 * Company edit page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompanyFormContainerComponent, CompanyHeadingContainerComponent],
  selector: 'app-company-edit-page',
  template: `
    <app-company-heading-container mode="edit" />
    <app-company-form-container mode="edit" />
  `
})
export class CompanyEditPageComponent {}
