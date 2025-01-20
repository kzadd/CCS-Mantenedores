import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matAssignment, matEdit, matVisibility } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { dealershipActions } from '@app/features/dealership/application/dealership.actions'
import { dealershipFeature } from '@app/features/dealership/application/dealership.feature'
import { Dealership } from '@app/features/dealership/domain/dealership.entity'
import { CrudTableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { TableAction, TableColumn } from '@app/shared/types/components/table.types'

const DEALERSHIP_TABLE_ICONS = {
  assignDealershipIcon: matAssignment,
  detailIcon: matVisibility,
  editIcon: matEdit
}

/**
 * Dealership table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudTableComponent],
  selector: 'app-dealership-table-container',
  template: `<app-crud-table
    [actions]="actions"
    [columns]="columns"
    [data]="dealerships()"
    [error]="error()"
    [filterableBy]="['id']"
    [loading]="loading()"
  />`
})
export class DealershipTableContainerComponent implements OnInit {
  private _router = inject(Router)
  private _store = inject(Store)

  dealerships = toSignal(this._store.select(dealershipFeature.selectDealerships), { initialValue: [] })
  error = toSignal(this._store.select(dealershipFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(dealershipFeature.selectLoading), { initialValue: false })

  actions: TableAction<Dealership>[] = [
    {
      icon: DEALERSHIP_TABLE_ICONS.detailIcon,
      label: 'Detalle',
      onAction: (row: Dealership) =>
        this._router.navigate([FULL_ROUTE_PATHS.dealership.show.replace(':id', row.id.toString())])
    },
    {
      color: 'secondary',
      icon: DEALERSHIP_TABLE_ICONS.editIcon,
      label: 'Editar',
      onAction: (row: Dealership) =>
        this._router.navigate([FULL_ROUTE_PATHS.dealership.edit.replace(':id', row.id.toString())])
    }
  ]

  columns: TableColumn<Dealership>[] = [
    {
      key: 'id',
      label: 'Id',
      width: '100px'
    }
  ]

  ngOnInit(): void {
    if (!this.dealerships()?.length) {
      this._store.dispatch(dealershipActions.loadDealerships())
    }
  }
}
