import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matAssignment, matEdit, matVisibility } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { userActions } from '@app/features/user/application/user.actions'
import { userFeature } from '@app/features/user/application/user.feature'
import { User } from '@app/features/user/domain/user.entity'
import { CrudTableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { TableAction, TableColumn } from '@app/shared/types/components/table.types'

const USER_TABLE_ICONS = {
  assignUserIcon: matAssignment,
  detailIcon: matVisibility,
  editIcon: matEdit
}

/**
 * User table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudTableComponent],
  selector: 'app-user-table-container',
  template: `<app-crud-table
    [actions]="actions"
    [columns]="columns"
    [data]="users()"
    [error]="error()"
    [filterableBy]="['id']"
    [loading]="loading()"
  />`
})
export class UserTableContainerComponent implements OnInit {
  private _router = inject(Router)
  private _store = inject(Store)

  users = toSignal(this._store.select(userFeature.selectUsers), { initialValue: [] })
  error = toSignal(this._store.select(userFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(userFeature.selectLoading), { initialValue: false })

  actions: TableAction<User>[] = [
    {
      icon: USER_TABLE_ICONS.detailIcon,
      label: 'Detalle',
      onAction: (row: User) => this._router.navigate([FULL_ROUTE_PATHS.user.show.replace(':id', row.id.toString())])
    },
    {
      color: 'secondary',
      icon: USER_TABLE_ICONS.editIcon,
      label: 'Editar',
      onAction: (row: User) => this._router.navigate([FULL_ROUTE_PATHS.user.edit.replace(':id', row.id.toString())])
    }
  ]

  columns: TableColumn<User>[] = [
    {
      key: 'id',
      label: 'Id',
      width: '100px'
    }
  ]

  ngOnInit(): void {
    if (!this.users()?.length) {
      this._store.dispatch(userActions.loadUsers())
    }
  }
}
