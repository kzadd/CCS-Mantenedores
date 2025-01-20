import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CompanyFormContainerComponent } from '../containers/company-form/company-form-container.component'
import { CompanyHeadingContainerComponent } from '../containers/company-heading-container.component'

/**
 * Company new page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompanyFormContainerComponent, CompanyHeadingContainerComponent],
  selector: 'app-company-new-page',
  template: `
    <app-company-heading-container mode="new" />
    <app-company-form-container mode="new" />
  `
})
export class CompanyNewPageComponent {}
