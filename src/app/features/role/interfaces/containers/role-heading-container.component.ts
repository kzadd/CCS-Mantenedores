import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matArrowBack, matPlus } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { RoleViewMode } from '@app/features/role/domain/role.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { Breadcrumb } from '@app/shared/types/components/breadcrumb.types'
import { HeadingAction, HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'
import { roleFeature } from '../../application/role.feature'

const ROLE_HEADING_ICONS = {
  backIcon: matArrowBack,
  newIcon: matPlus
}

/**
 * Role heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-role-heading-container',
  template: `<app-crud-heading [config]="headingConfig" [loading]="loading()" [mode]="mode" />`
})
export class RoleHeadingContainerComponent {
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: RoleViewMode

  loading = toSignal(this._store.select(roleFeature.selectLoading), { initialValue: false })

  defaultBackAction: HeadingAction = {
    icon: ROLE_HEADING_ICONS.backIcon,
    label: 'Volver al listado',
    onAction: () => this._router.navigate([FULL_ROUTE_PATHS.role.list]),
    variant: 'outlined'
  }

  headingConfig: HeadingConfig<RoleViewMode> = {
    edit: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Editar rol', 'base'),
      title: 'Editar información del rol'
    },
    list: {
      actions: [
        {
          icon: ROLE_HEADING_ICONS.newIcon,
          label: 'Agregar rol',
          onAction: () => this._router.navigate([FULL_ROUTE_PATHS.role.new])
        }
      ],
      breadcrumbs: this._buildBreadcrumb('Lista de roles'),
      title: 'Listado de roles'
    },
    new: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Agregar rol', 'base'),
      title: 'Agregar nuevo rol'
    },
    show: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Detalles del rol', 'base'),
      title: 'Información detallada del rol'
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
        label: 'Roles',
        path: FULL_ROUTE_PATHS.role.list
      })
    }

    baseBreadcrumbs.push({
      label
    })

    return baseBreadcrumbs
  }
}
