import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Router } from '@angular/router'
import { matArrowBack, matPlus } from '@ng-icons/material-icons/baseline'

import { CountryViewMode } from '@app/features/country/domain/country.entity'
import { CrudHeadingComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { Breadcrumb } from '@app/shared/types/components/breadscrumb.types'
import { HeadingAction, HeadingConfig } from '@app/shared/types/components/customs/crud-heading.types'

const COUNTRY_HEADING_ICONS = {
  backIcon: matArrowBack,
  newIcon: matPlus
}

/**
 * Country heading container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudHeadingComponent],
  selector: 'app-country-heading-container',
  styleUrl: './country-heading-container.component.scss',
  templateUrl: './country-heading-container.component.html'
})
export class CountryHeadingContainerComponent {
  private _router = inject(Router)

  @Input({ required: true }) mode!: CountryViewMode

  backAction: HeadingAction = {
    icon: COUNTRY_HEADING_ICONS.backIcon,
    label: 'Volver al listado',
    onAction: () => this._router.navigate([FULL_ROUTE_PATHS.country.list]),
    variant: 'outlined'
  }

  headingConfig: HeadingConfig<CountryViewMode> = {
    edit: {
      actions: [this.backAction],
      breadcrumbs: this._buildBreadcrumb('Editar país', 'base'),
      title: 'Editar información del país'
    },
    list: {
      actions: [
        {
          icon: COUNTRY_HEADING_ICONS.newIcon,
          label: 'Agregar país',
          onAction: () => this._router.navigate([FULL_ROUTE_PATHS.country.new])
        }
      ],
      breadcrumbs: this._buildBreadcrumb('Lista de países'),
      title: 'Listado de países'
    },
    new: {
      actions: [this.backAction],
      breadcrumbs: this._buildBreadcrumb('Agregar país', 'base'),
      title: 'Agregar nuevo país'
    },
    show: {
      actions: [this.backAction],
      breadcrumbs: this._buildBreadcrumb('Detalles del país', 'base'),
      title: 'Información detallada del país'
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
        label: 'Países',
        path: FULL_ROUTE_PATHS.country.list
      })
    }

    baseBreadcrumbs.push({
      label
    })

    return baseBreadcrumbs
  }
}
