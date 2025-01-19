import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matHome } from '@ng-icons/material-icons/baseline'

import { Breadcrumb } from '@app/shared/types/components/breadcrumb.types'

const BREADCRUMB_ICONS = {
  homeIcon: matHome
}

/**
 * Breadcrumb component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.component.scss',
  templateUrl: './breadcrumb.component.html',
  viewProviders: [provideIcons(BREADCRUMB_ICONS)]
})
export class BreadcrumbComponent {
  @Input({ required: true }) breadcrumbs!: Breadcrumb[]
}
