import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { functionalityActions } from '@app/features/functionality/application/functionality.actions'
import { functionalityFeature } from '@app/features/functionality/application/functionality.feature'
import {
  FunctionalityForm,
  FunctionalityFormViewMode,
  FunctionalityKey
} from '@app/features/functionality/domain/functionality.entity'
import { ButtonComponent, InputComponent, ToastComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isNumber, isRequired } from '@app/shared/utils/validators.utils'

/**
 * Functionality form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, ToastComponent],
  selector: 'app-functionality-form-container',
  styleUrl: './functionality-form-container.component.scss',
  templateUrl: './functionality-form-container.component.html'
})
export class FunctionalityFormContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: FunctionalityFormViewMode

  functionality = toSignal(this._store.select(functionalityFeature.selectFunctionality), { initialValue: null })
  error = toSignal(this._store.select(functionalityFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(functionalityFeature.selectLoading), { initialValue: false })

  form: FormGroup<FunctionalityForm> = this._formBuilder.group<FunctionalityForm>({
    id: this._formBuilder.control('', [isRequired, isNumber])
  })

  get submitButtonLabel(): string {
    return this.mode === 'edit' ? 'Actualizar funcionalidad' : 'Crear funcionalidad'
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const id = this._route.snapshot.params['id']

      this._store.dispatch(functionalityActions.loadFunctionality({ id }))

      this._store
        .select(functionalityFeature.selectFunctionalityState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error && state.functionality) {
            this.form.patchValue(state.functionality)
          }
        })

      this.form.get('id')?.disable()
    }

    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this._store.dispatch(functionalityActions.clearError())
      }
    })
  }

  getErrorMessage(controlName: FunctionalityKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSubmit() {
    if (this.form.valid) {
      const id = this._route.snapshot.params['id']
      const functionality = this.form.getRawValue()

      const action =
        this.mode === 'edit'
          ? functionalityActions.updateFunctionality({ functionality, id })
          : functionalityActions.createFunctionality({ functionality })

      this._store.dispatch(action)

      this._store
        .select(functionalityFeature.selectFunctionalityState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this._router.navigate([FULL_ROUTE_PATHS.functionality.list])
            this._store.dispatch(functionalityActions.loadFunctionalities())
          }
        })
    }
  }
}
