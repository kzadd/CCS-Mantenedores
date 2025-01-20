import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matArrowBack, matPlus } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { CompanyViewMode } from '@app/features/company/domain/company.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { Breadcrumb } from '@app/shared/types/components/breadcrumb.types'
import { HeadingAction, HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'
import { companyFeature } from '../../application/company.feature'

const COMPANY_HEADING_ICONS = {
  backIcon: matArrowBack,
  newIcon: matPlus
}

/**
 * Company heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-company-heading-container',
  template: `<app-crud-heading [config]="headingConfig" [loading]="loading()" [mode]="mode" />`
})
export class CompanyHeadingContainerComponent {
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: CompanyViewMode

  loading = toSignal(this._store.select(companyFeature.selectLoading), { initialValue: false })

  defaultBackAction: HeadingAction = {
    icon: COMPANY_HEADING_ICONS.backIcon,
    label: 'Volver al listado',
    onAction: () => this._router.navigate([FULL_ROUTE_PATHS.company.list]),
    variant: 'outlined'
  }

  headingConfig: HeadingConfig<CompanyViewMode> = {
    edit: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Editar empresa', 'base'),
      title: 'Editar información de la empresa'
    },
    list: {
      actions: [
        {
          icon: COMPANY_HEADING_ICONS.newIcon,
          label: 'Agregar empresa',
          onAction: () => this._router.navigate([FULL_ROUTE_PATHS.company.new])
        }
      ],
      breadcrumbs: this._buildBreadcrumb('Lista de empresas'),
      title: 'Listado de empresas'
    },
    new: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Agregar empresa', 'base'),
      title: 'Agregar nueva empresa'
    },
    show: {
      actions: [this.defaultBackAction],
      breadcrumbs: this._buildBreadcrumb('Detalles de la empresa', 'base'),
      title: 'Información detallada de la empresa'
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
        label: 'Empresas',
        path: FULL_ROUTE_PATHS.company.list
      })
    }

    baseBreadcrumbs.push({
      label
    })

    return baseBreadcrumbs
  }
}
