import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { CrudDetailComponent } from '@app/shared/components'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { dealershipActions } from '../../application/dealership.actions'
import { dealershipFeature } from '../../application/dealership.feature'
import { Dealership } from '../../domain/dealership.entity'

/**
 * Dealership detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-dealership-detail-container',
  template: `<app-crud-detail [config]="detailConfig" [error]="error()" [loading]="loading()" />`
})
export class DealershipDetailContainerComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _store = inject(Store)

  dealership = toSignal(this._store.select(dealershipFeature.selectDealership), { initialValue: null })
  error = toSignal(this._store.select(dealershipFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(dealershipFeature.selectLoading), { initialValue: false })

  ngOnInit(): void {
    const id = this._route.snapshot.params['id']

    this._store.dispatch(dealershipActions.loadDealership({ id }))
  }

  get detailConfig(): DetailConfig<Dealership>[] {
    return [
      {
        key: 'id',
        label: 'Id',
        value: this.dealership()?.id ?? ''
      }
    ]
  }
}
