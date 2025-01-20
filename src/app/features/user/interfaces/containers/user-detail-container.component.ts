import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { CrudDetailComponent } from '@app/shared/components'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { userActions } from '../../application/user.actions'
import { userFeature } from '../../application/user.feature'
import { User } from '../../domain/user.entity'

/**
 * User detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-user-detail-container',
  template: `<app-crud-detail [config]="detailConfig" [error]="error()" [loading]="loading()" />`
})
export class UserDetailContainerComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _store = inject(Store)

  user = toSignal(this._store.select(userFeature.selectUser), { initialValue: null })
  error = toSignal(this._store.select(userFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(userFeature.selectLoading), { initialValue: false })

  ngOnInit(): void {
    const id = this._route.snapshot.params['id']

    this._store.dispatch(userActions.loadUser({ id }))
  }

  get detailConfig(): DetailConfig<User>[] {
    return [
      {
        key: 'id',
        label: 'Id',
        value: this.user()?.id ?? ''
      }
    ]
  }
}
