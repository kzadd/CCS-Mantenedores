import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matArrowBack, matPlus } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { FunctionalityViewMode } from '@app/features/functionality/domain/functionality.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { Breadcrumb } from '@app/shared/types/components/breadcrumb.types'
import { HeadingAction, HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'
import { functionalityFeature } from '../../application/functionality.feature'

const FUNCTIONALITY_HEADING_ICONS = {
  backIcon: matArrowBack,
  newIcon: matPlus
}

/**
 * Functionality heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-functionality-heading-container',
  template: `<app-crud-heading [config]="headingConfig" [loading]="loading()" [mode]="mode" />`
})
export class FunctionalityHeadingContainerComponent {
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: FunctionalityViewMode

  loading = toSignal(this._store.select(functionalityFeature.selectLoading), { initialValue: false })

  defaultBackAction: HeadingAction = {
    icon: FUNCTIONALITY_HEADING_ICONS.backIcon,
    label: 'Volver al listado',
    onAction: () => this._router.navigate([FULL_ROUTE_PATHS.functionality.list]),
    variant: 'outlined'
  }

  headingConfig: HeadingConfig<FunctionalityViewMode> = {
    edit: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Editar funcionalidad', 'base'),
      title: 'Editar información de la funcionalidad'
    },
    list: {
      actions: [
        {
          icon: FUNCTIONALITY_HEADING_ICONS.newIcon,
          label: 'Agregar funcionalidad',
          onAction: () => this._router.navigate([FULL_ROUTE_PATHS.functionality.new])
        }
      ],
      breadcrumbs: this._buildBreadcrumb('Lista de funcionalidades'),
      title: 'Listado de funcionalidades'
    },
    new: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Agregar funcionalidad', 'base'),
      title: 'Agregar nueva funcionalidad'
    },
    show: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Detalles de la funcionalidad', 'base'),
      title: 'Información detallada de la funcionalidad'
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
        label: 'Funcionalidades',
        path: FULL_ROUTE_PATHS.functionality.list
      })
    }

    baseBreadcrumbs.push({
      label
    })

    return baseBreadcrumbs
  }
}
