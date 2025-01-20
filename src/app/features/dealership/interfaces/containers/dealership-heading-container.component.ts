import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matArrowBack, matPlus } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { DealershipViewMode } from '@app/features/dealership/domain/dealership.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { Breadcrumb } from '@app/shared/types/components/breadcrumb.types'
import { HeadingAction, HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'
import { dealershipFeature } from '../../application/dealership.feature'

const DEALERSHIP_HEADING_ICONS = {
  backIcon: matArrowBack,
  newIcon: matPlus
}

/**
 * Dealership heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-dealership-heading-container',
  template: `<app-crud-heading [config]="headingConfig" [loading]="loading()" [mode]="mode" />`
})
export class DealershipHeadingContainerComponent {
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: DealershipViewMode

  loading = toSignal(this._store.select(dealershipFeature.selectLoading), { initialValue: false })

  defaultBackAction: HeadingAction = {
    icon: DEALERSHIP_HEADING_ICONS.backIcon,
    label: 'Volver al listado',
    onAction: () => this._router.navigate([FULL_ROUTE_PATHS.dealership.list]),
    variant: 'outlined'
  }

  headingConfig: HeadingConfig<DealershipViewMode> = {
    edit: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Editar concesionario', 'base'),
      title: 'Editar información del concesionario'
    },
    list: {
      actions: [
        {
          icon: DEALERSHIP_HEADING_ICONS.newIcon,
          label: 'Agregar concesionario',
          onAction: () => this._router.navigate([FULL_ROUTE_PATHS.dealership.new])
        }
      ],
      breadcrumbs: this._buildBreadcrumb('Lista de concesionarios'),
      title: 'Listado de concesionarios'
    },
    new: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Agregar concesionario', 'base'),
      title: 'Agregar nuevo concesionario'
    },
    show: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Detalles del concesionario', 'base'),
      title: 'Información detallada del concesionario'
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
        label: 'Concesionarios',
        path: FULL_ROUTE_PATHS.dealership.list
      })
    }

    baseBreadcrumbs.push({
      label
    })

    return baseBreadcrumbs
  }
}
