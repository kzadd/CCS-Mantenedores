import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CompanyHeadingContainerComponent } from '../containers/company-heading-container.component'
import { CompanyTableContainerComponent } from '../containers/company-table-container.component'

/**
 * Company list page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompanyHeadingContainerComponent, CompanyTableContainerComponent],
  selector: 'app-company-list-page',
  template: `
    <app-company-heading-container mode="list" />
    <app-company-table-container />
  `
})
export class CompanyListPageComponent {}
