import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matAssignment, matEdit, matVisibility } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { countryActions } from '@app/features/country/application/country.actions'
import { countryFeature } from '@app/features/country/application/country.feature'
import { Country } from '@app/features/country/domain/country.entity'
import { CrudTableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { TableAction, TableColumn } from '@app/shared/types/components/table.types'

const COUNTRY_TABLE_ICONS = {
  assignCompanyIcon: matAssignment,
  detailIcon: matVisibility,
  editIcon: matEdit
}

/**
 * Country table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudTableComponent],
  selector: 'app-country-table-container',
  template: `<app-crud-table
    [actions]="actions"
    [columns]="columns"
    [data]="countries()"
    [error]="error()"
    [loading]="loading()"
  />`
})
export class CountryTableContainerComponent implements OnInit {
  private _router = inject(Router)
  private _store = inject(Store)

  countries = toSignal(this._store.select(countryFeature.selectCountries), { initialValue: [] })
  error = toSignal(this._store.select(countryFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(countryFeature.selectLoading), { initialValue: false })

  actions: TableAction<Country>[] = [
    {
      icon: COUNTRY_TABLE_ICONS.detailIcon,
      label: 'Detalle',
      onAction: (row: Country) =>
        this._router.navigate([FULL_ROUTE_PATHS.country.show.replace(':id', row.id.toString())])
    },
    {
      color: 'secondary',
      icon: COUNTRY_TABLE_ICONS.editIcon,
      label: 'Editar',
      onAction: (row: Country) =>
        this._router.navigate([FULL_ROUTE_PATHS.country.edit.replace(':id', row.id.toString())])
    }
  ]

  columns: TableColumn<Country>[] = [
    {
      key: 'id',
      label: 'Id',
      width: '100px'
    },
    {
      key: 'name',
      label: 'Nombre',
      width: '245px'
    },
    {
      key: 'status',
      label: 'Estado',
      width: '100px'
    },
    {
      key: 'createdAt',
      label: 'Fecha creación',
      width: '180px'
    },
    {
      key: 'createdBy',
      label: 'Creado por',
      width: '180px'
    },
    {
      key: 'updatedAt',
      label: 'Fecha actualización',
      width: '200px'
    },
    {
      key: 'updatedBy',
      label: 'Actualizado por',
      width: '180px'
    }
  ]

  ngOnInit(): void {
    if (!this.countries().length) {
      this._store.dispatch(countryActions.loadCountries())
    }
  }
}
