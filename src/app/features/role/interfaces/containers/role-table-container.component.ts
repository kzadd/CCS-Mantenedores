import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matAssignment, matEdit, matVisibility } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { roleActions } from '@app/features/role/application/role.actions'
import { roleFeature } from '@app/features/role/application/role.feature'
import { Role } from '@app/features/role/domain/role.entity'
import { CrudTableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { TableAction, TableColumn } from '@app/shared/types/components/table.types'

const ROLE_TABLE_ICONS = {
  assignRoleIcon: matAssignment,
  detailIcon: matVisibility,
  editIcon: matEdit
}

/**
 * Role table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudTableComponent],
  selector: 'app-role-table-container',
  template: `<app-crud-table
    [actions]="actions"
    [columns]="columns"
    [data]="roles()"
    [error]="error()"
    [filterableBy]="['id']"
    [loading]="loading()"
  />`
})
export class RoleTableContainerComponent implements OnInit {
  private _router = inject(Router)
  private _store = inject(Store)

  roles = toSignal(this._store.select(roleFeature.selectRoles), { initialValue: [] })
  error = toSignal(this._store.select(roleFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(roleFeature.selectLoading), { initialValue: false })

  actions: TableAction<Role>[] = [
    {
      icon: ROLE_TABLE_ICONS.detailIcon,
      label: 'Detalle',
      onAction: (row: Role) => this._router.navigate([FULL_ROUTE_PATHS.role.show.replace(':id', row.id.toString())])
    },
    {
      color: 'secondary',
      icon: ROLE_TABLE_ICONS.editIcon,
      label: 'Editar',
      onAction: (row: Role) => this._router.navigate([FULL_ROUTE_PATHS.role.edit.replace(':id', row.id.toString())])
    }
  ]

  columns: TableColumn<Role>[] = [
    {
      key: 'id',
      label: 'Id',
      width: '100px'
    }
  ]

  ngOnInit(): void {
    if (!this.roles()?.length) {
      this._store.dispatch(roleActions.loadRoles())
    }
  }
}
