import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { matAssignment, matEdit, matVisibility } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { companyActions } from '@app/features/company/application/company.actions'
import { companyFeature } from '@app/features/company/application/company.feature'
import { Company } from '@app/features/company/domain/company.entity'
import { CrudTableComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { TableAction, TableColumn } from '@app/shared/types/components/table.types'

const COMPANY_TABLE_ICONS = {
  assignCompanyIcon: matAssignment,
  detailIcon: matVisibility,
  editIcon: matEdit
}

/**
 * Company table container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudTableComponent],
  selector: 'app-company-table-container',
  template: `<app-crud-table
    [actions]="actions"
    [columns]="columns"
    [data]="companies()"
    [error]="error()"
    [filterableBy]="['id']"
    [loading]="loading()"
  />`
})
export class CompanyTableContainerComponent implements OnInit {
  private _router = inject(Router)
  private _store = inject(Store)

  companies = toSignal(this._store.select(companyFeature.selectCompanies), { initialValue: [] })
  error = toSignal(this._store.select(companyFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(companyFeature.selectLoading), { initialValue: false })

  actions: TableAction<Company>[] = [
    {
      icon: COMPANY_TABLE_ICONS.detailIcon,
      label: 'Detalle',
      onAction: (row: Company) =>
        this._router.navigate([FULL_ROUTE_PATHS.company.show.replace(':id', row.id.toString())])
    },
    {
      color: 'secondary',
      icon: COMPANY_TABLE_ICONS.editIcon,
      label: 'Editar',
      onAction: (row: Company) =>
        this._router.navigate([FULL_ROUTE_PATHS.company.edit.replace(':id', row.id.toString())])
    }
  ]

  columns: TableColumn<Company>[] = [
    {
      key: 'id',
      label: 'Id',
      width: '100px'
    }
  ]

  ngOnInit(): void {
    if (!this.companies()?.length) {
      this._store.dispatch(companyActions.loadCompanies())
    }
  }
}
