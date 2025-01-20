import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matAssignment, matEdit, matVisibility } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { functionalityActions } from '@app/features/functionality/application/functionality.actions'
import { functionalityFeature } from '@app/features/functionality/application/functionality.feature'
import { Functionality } from '@app/features/functionality/domain/functionality.entity'
import { CrudTableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { TableAction, TableColumn } from '@app/shared/types/components/table.types'

const FUNCTIONALITY_TABLE_ICONS = {
  assignFunctionalityIcon: matAssignment,
  detailIcon: matVisibility,
  editIcon: matEdit
}

/**
 * Functionality table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudTableComponent],
  selector: 'app-functionality-table-container',
  template: `<app-crud-table
    [actions]="actions"
    [columns]="columns"
    [data]="functionalities()"
    [error]="error()"
    [filterableBy]="['id']"
    [loading]="loading()"
  />`
})
export class FunctionalityTableContainerComponent implements OnInit {
  private _router = inject(Router)
  private _store = inject(Store)

  functionalities = toSignal(this._store.select(functionalityFeature.selectFunctionalities), { initialValue: [] })
  error = toSignal(this._store.select(functionalityFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(functionalityFeature.selectLoading), { initialValue: false })

  actions: TableAction<Functionality>[] = [
    {
      icon: FUNCTIONALITY_TABLE_ICONS.detailIcon,
      label: 'Detalle',
      onAction: (row: Functionality) =>
        this._router.navigate([FULL_ROUTE_PATHS.functionality.show.replace(':id', row.id.toString())])
    },
    {
      color: 'secondary',
      icon: FUNCTIONALITY_TABLE_ICONS.editIcon,
      label: 'Editar',
      onAction: (row: Functionality) =>
        this._router.navigate([FULL_ROUTE_PATHS.functionality.edit.replace(':id', row.id.toString())])
    }
  ]

  columns: TableColumn<Functionality>[] = [
    {
      key: 'id',
      label: 'Id',
      width: '100px'
    }
  ]

  ngOnInit(): void {
    if (!this.functionalities()?.length) {
      this._store.dispatch(functionalityActions.loadFunctionalities())
    }
  }
}
