import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { CrudDetailComponent } from '@app/shared/components'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { companyActions } from '../../application/company.actions'
import { companyFeature } from '../../application/company.feature'
import { Company } from '../../domain/company.entity'

/**
 * Company detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-company-detail-container',
  template: `<app-crud-detail [config]="detailConfig" [error]="error()" [loading]="loading()" />`
})
export class CompanyDetailContainerComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _store = inject(Store)

  company = toSignal(this._store.select(companyFeature.selectCompany), { initialValue: null })
  error = toSignal(this._store.select(companyFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(companyFeature.selectLoading), { initialValue: false })

  ngOnInit(): void {
    const id = this._route.snapshot.params['id']

    this._store.dispatch(companyActions.loadCompany({ id }))
  }

  get detailConfig(): DetailConfig<Company>[] {
    return [
      {
        key: 'id',
        label: 'Id',
        value: this.company()?.id ?? ''
      }
    ]
  }
}
