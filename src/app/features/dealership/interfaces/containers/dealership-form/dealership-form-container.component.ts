import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { dealershipActions } from '@app/features/dealership/application/dealership.actions'
import { dealershipFeature } from '@app/features/dealership/application/dealership.feature'
import {
  DealershipForm,
  DealershipFormViewMode,
  DealershipKey
} from '@app/features/dealership/domain/dealership.entity'
import { ButtonComponent, InputComponent, ToastComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isNumber, isRequired } from '@app/shared/utils/validators.utils'

/**
 * Dealership form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, ToastComponent],
  selector: 'app-dealership-form-container',
  styleUrl: './dealership-form-container.component.scss',
  templateUrl: './dealership-form-container.component.html'
})
export class DealershipFormContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: DealershipFormViewMode

  dealership = toSignal(this._store.select(dealershipFeature.selectDealership), { initialValue: null })
  error = toSignal(this._store.select(dealershipFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(dealershipFeature.selectLoading), { initialValue: false })

  form: FormGroup<DealershipForm> = this._formBuilder.group<DealershipForm>({
    id: this._formBuilder.control('', [isRequired, isNumber])
  })

  get submitButtonLabel(): string {
    return this.mode === 'edit' ? 'Actualizar concesionario' : 'Crear concesionario'
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const id = this._route.snapshot.params['id']

      this._store.dispatch(dealershipActions.loadDealership({ id }))

      this._store
        .select(dealershipFeature.selectDealershipState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error && state.dealership) {
            this.form.patchValue(state.dealership)
          }
        })

      this.form.get('id')?.disable()
    }

    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this._store.dispatch(dealershipActions.clearError())
      }
    })
  }

  getErrorMessage(controlName: DealershipKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSubmit() {
    if (this.form.valid) {
      const id = this._route.snapshot.params['id']
      const dealership = this.form.getRawValue()

      const action =
        this.mode === 'edit'
          ? dealershipActions.updateDealership({ dealership, id })
          : dealershipActions.createDealership({ dealership })

      this._store.dispatch(action)

      this._store
        .select(dealershipFeature.selectDealershipState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this._router.navigate([FULL_ROUTE_PATHS.dealership.list])
            this._store.dispatch(dealershipActions.loadDealerships())
          }
        })
    }
  }
}
