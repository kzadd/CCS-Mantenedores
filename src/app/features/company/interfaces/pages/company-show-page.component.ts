import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CompanyDetailContainerComponent } from '../containers/company-detail-container.component'
import { CompanyHeadingContainerComponent } from '../containers/company-heading-container.component'

/**
 * Company show page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompanyDetailContainerComponent, CompanyHeadingContainerComponent],
  selector: 'app-company-show-page',
  template: `
    <app-company-heading-container mode="show" />
    <app-company-detail-container />
  `
})
export class CompanyShowPageComponent {}
