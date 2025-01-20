import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { CrudDetailComponent } from '@app/shared/components'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { roleActions } from '../../application/role.actions'
import { roleFeature } from '../../application/role.feature'
import { Role } from '../../domain/role.entity'

/**
 * Role detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-role-detail-container',
  template: `<app-crud-detail [config]="detailConfig" [error]="error()" [loading]="loading()" />`
})
export class RoleDetailContainerComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _store = inject(Store)

  role = toSignal(this._store.select(roleFeature.selectRole), { initialValue: null })
  error = toSignal(this._store.select(roleFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(roleFeature.selectLoading), { initialValue: false })

  ngOnInit(): void {
    const id = this._route.snapshot.params['id']

    this._store.dispatch(roleActions.loadRole({ id }))
  }

  get detailConfig(): DetailConfig<Role>[] {
    return [
      {
        key: 'id',
        label: 'Id',
        value: this.role()?.id ?? ''
      }
    ]
  }
}
