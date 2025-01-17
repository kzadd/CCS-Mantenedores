import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core'
import { NavigationEnd, Router, RouterLink } from '@angular/router'
import { NgIcon } from '@ng-icons/core'
import { matHome } from '@ng-icons/material-icons/baseline'

import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'
import { NavigationItem, RouteKey } from '@app/shared/types/navigation.types'

const SIDEBAR_ICONS = {
  homeIcon: matHome
}

/**
 * Sidebar container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink],
  selector: 'app-sidebar-container',
  styleUrl: './sidebar-container.component.scss',
  templateUrl: './sidebar-container.component.html'
})
export class SidebarContainerComponent implements OnInit {
  private _router = inject(Router)

  @Input() sidebarCollapsed = false

  @Output() closeSidebar = new EventEmitter<void>()

  currentUrl = signal<string>(this._router.url)

  navigationItems: NavigationItem[] = [
    {
      icon: SIDEBAR_ICONS.homeIcon,
      label: 'Panel',
      namePath: 'dashboard',
      path: this._buildPath('dashboard')
    }
  ]

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects)
      }
    })
  }

  private _buildPath(section: RouteKey): string {
    return section === ROUTE_PATHS.dashboard
      ? FULL_ROUTE_PATHS.dashboard.root
      : `${FULL_ROUTE_PATHS.dashboard.root}/${ROUTE_PATHS[section]}/${ROUTE_PATHS.list}`
  }

  isRouteActive(namePath: string, path: string): boolean {
    const currentUrl = this.currentUrl()

    return currentUrl === path || currentUrl.split('/')[2] === namePath
  }

  handleCloseSidebar(): void {
    this.closeSidebar.emit()
  }
}
