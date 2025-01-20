import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matArrowBack, matPlus } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { UserViewMode } from '@app/features/user/domain/user.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { Breadcrumb } from '@app/shared/types/components/breadcrumb.types'
import { HeadingAction, HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'
import { userFeature } from '../../application/user.feature'

const USER_HEADING_ICONS = {
  backIcon: matArrowBack,
  newIcon: matPlus
}

/**
 * User heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-user-heading-container',
  template: `<app-crud-heading [config]="headingConfig" [loading]="loading()" [mode]="mode" />`
})
export class UserHeadingContainerComponent {
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: UserViewMode

  loading = toSignal(this._store.select(userFeature.selectLoading), { initialValue: false })

  defaultBackAction: HeadingAction = {
    icon: USER_HEADING_ICONS.backIcon,
    label: 'Volver al listado',
    onAction: () => this._router.navigate([FULL_ROUTE_PATHS.user.list]),
    variant: 'outlined'
  }

  headingConfig: HeadingConfig<UserViewMode> = {
    edit: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Editar usuario', 'base'),
      title: 'Editar información del usuario'
    },
    list: {
      actions: [
        {
          icon: USER_HEADING_ICONS.newIcon,
          label: 'Agregar usuario',
          onAction: () => this._router.navigate([FULL_ROUTE_PATHS.user.new])
        }
      ],
      breadcrumbs: this._buildBreadcrumb('Lista de usuarios'),
      title: 'Listado de usuarios'
    },
    new: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Agregar usuario', 'base'),
      title: 'Agregar nuevo usuario'
    },
    show: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Detalles del usuario', 'base'),
      title: 'Información detallada del usuario'
    }
  }

  private _buildBreadcrumb(label: string, type?: 'base'): Breadcrumb[] {
    const baseBreadcrumbs: Breadcrumb[] = [
      {
        label: 'Panel',
        path: FULL_ROUTE_PATHS.dashboard.root
      }
    ]

    if (type === 'base') {
      baseBreadcrumbs.push({
        label: 'Usuarios',
        path: FULL_ROUTE_PATHS.user.list
      })
    }

    baseBreadcrumbs.push({
      label
    })

    return baseBreadcrumbs
  }
}
