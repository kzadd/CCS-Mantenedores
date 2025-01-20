import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { countryActions } from '@app/features/country/application/country.actions'
import { countryFeature } from '@app/features/country/application/country.feature'
import { CountryForm, CountryFormViewMode, CountryKey } from '@app/features/country/domain/country.entity'
import {
  ButtonComponent,
  CheckboxComponent,
  DateComponent,
  InputComponent,
  ToastComponent
} from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isNumber, isRequired, maxLength } from '@app/shared/utils/validators.utils'

/**
 * Country form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CheckboxComponent, DateComponent, InputComponent, ReactiveFormsModule, ToastComponent],
  selector: 'app-country-form-container',
  styleUrl: './country-form-container.component.scss',
  templateUrl: './country-form-container.component.html'
})
export class CountryFormContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: CountryFormViewMode

  country = toSignal(this._store.select(countryFeature.selectCountry), { initialValue: null })
  error = toSignal(this._store.select(countryFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(countryFeature.selectLoading), { initialValue: false })

  form: FormGroup<CountryForm> = this._formBuilder.group<CountryForm>({
    createdAt: this._formBuilder.control('', [isRequired]),
    createdBy: this._formBuilder.control('', [isRequired, maxLength(100)]),
    id: this._formBuilder.control('', [isRequired, isNumber]),
    name: this._formBuilder.control('', [isRequired, maxLength(40)]),
    status: this._formBuilder.control(true),
    updatedAt: this._formBuilder.control('', [isRequired]),
    updatedBy: this._formBuilder.control('', [isRequired, maxLength(100)])
  })

  get submitButtonLabel(): string {
    return this.mode === 'edit' ? 'Actualizar país' : 'Crear país'
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const id = this._route.snapshot.params['id']

      this._store.dispatch(countryActions.loadCountry({ id }))

      this._store
        .select(countryFeature.selectCountryState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error && state.country) {
            this.form.patchValue(state.country)
          }
        })

      this.form.get('id')?.disable()
    }

    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this._store.dispatch(countryActions.clearError())
      }
    })
  }

  getErrorMessage(controlName: CountryKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSubmit() {
    if (this.form.valid) {
      const id = this._route.snapshot.params['id']
      const country = this.form.getRawValue()

      const action =
        this.mode === 'edit' ? countryActions.updateCountry({ country, id }) : countryActions.createCountry({ country })

      this._store.dispatch(action)

      this._store
        .select(countryFeature.selectCountryState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this._router.navigate([FULL_ROUTE_PATHS.country.list])
            this._store.dispatch(countryActions.loadCountries())
          }
        })
    }
  }
}
