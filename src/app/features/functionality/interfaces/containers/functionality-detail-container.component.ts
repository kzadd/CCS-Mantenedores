import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { CrudDetailComponent } from '@app/shared/components'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { functionalityActions } from '../../application/functionality.actions'
import { functionalityFeature } from '../../application/functionality.feature'
import { Functionality } from '../../domain/functionality.entity'

/**
 * Functionality detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-functionality-detail-container',
  template: `<app-crud-detail [config]="detailConfig" [error]="error()" [loading]="loading()" />`
})
export class FunctionalityDetailContainerComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _store = inject(Store)

  functionality = toSignal(this._store.select(functionalityFeature.selectFunctionality), { initialValue: null })
  error = toSignal(this._store.select(functionalityFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(functionalityFeature.selectLoading), { initialValue: false })

  ngOnInit(): void {
    const id = this._route.snapshot.params['id']

    this._store.dispatch(functionalityActions.loadFunctionality({ id }))
  }

  get detailConfig(): DetailConfig<Functionality>[] {
    return [
      {
        key: 'id',
        label: 'Id',
        value: this.functionality()?.id ?? ''
      }
    ]
  }
}
