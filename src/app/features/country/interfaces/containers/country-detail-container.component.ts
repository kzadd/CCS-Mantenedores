import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { CrudDetailComponent } from '@app/shared/components'
import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { countryActions } from '../../application/country.actions'
import { countryFeature } from '../../application/country.feature'
import { Country } from '../../domain/country.entity'

/**
 * Country detail container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CrudDetailComponent],
  selector: 'app-country-detail-container',
  template: `<app-crud-detail [config]="detailConfig" [error]="error()" [loading]="loading()" />`
})
export class CountryDetailContainerComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _store = inject(Store)

  country = toSignal(this._store.select(countryFeature.selectCountry), { initialValue: null })
  error = toSignal(this._store.select(countryFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(countryFeature.selectLoading), { initialValue: false })

  ngOnInit(): void {
    const id = this._route.snapshot.params['id']

    this._store.dispatch(countryActions.loadCountry({ id }))
  }

  get detailConfig(): DetailConfig<Country>[] {
    return [
      {
        key: 'id',
        label: 'Id',
        value: this.country()?.id ?? ''
      },
      {
        key: 'name',
        label: 'Nombre',
        value: this.country()?.name ?? ''
      },
      {
        key: 'status',
        label: 'Estado',
        value: this.country()?.status ?? ''
      },
      {
        key: 'createdAt',
        label: 'Fecha creación',
        value: this.country()?.createdAt ?? ''
      },
      {
        key: 'createdBy',
        label: 'Creado por',
        value: this.country()?.createdBy ?? ''
      },
      {
        key: 'updatedAt',
        label: 'Fecha actualización',
        value: this.country()?.updatedAt ?? ''
      },
      {
        key: 'updatedBy',
        label: 'Actualizado por',
        value: this.country()?.updatedBy ?? ''
      }
    ]
  }
}
