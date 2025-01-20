import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { companyActions } from '@app/features/company/application/company.actions'
import { companyFeature } from '@app/features/company/application/company.feature'
import { CompanyForm, CompanyFormViewMode, CompanyKey } from '@app/features/company/domain/company.entity'
import { ButtonComponent, InputComponent, ToastComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isNumber, isRequired } from '@app/shared/utils/validators.utils'

/**
 * Company form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, ToastComponent],
  selector: 'app-company-form-container',
  styleUrl: './company-form-container.component.scss',
  templateUrl: './company-form-container.component.html'
})
export class CompanyFormContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: CompanyFormViewMode

  company = toSignal(this._store.select(companyFeature.selectCompany), { initialValue: null })
  error = toSignal(this._store.select(companyFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(companyFeature.selectLoading), { initialValue: false })

  form: FormGroup<CompanyForm> = this._formBuilder.group<CompanyForm>({
    id: this._formBuilder.control('', [isRequired, isNumber])
  })

  get submitButtonLabel(): string {
    return this.mode === 'edit' ? 'Actualizar empresa' : 'Crear empresa'
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const id = this._route.snapshot.params['id']

      this._store.dispatch(companyActions.loadCompany({ id }))

      this._store
        .select(companyFeature.selectCompanyState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error && state.company) {
            this.form.patchValue(state.company)
          }
        })

      this.form.get('id')?.disable()
    }

    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this._store.dispatch(companyActions.clearError())
      }
    })
  }

  getErrorMessage(controlName: CompanyKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSubmit() {
    if (this.form.valid) {
      const id = this._route.snapshot.params['id']
      const company = this.form.getRawValue()

      const action =
        this.mode === 'edit' ? companyActions.updateCompany({ company, id }) : companyActions.createCompany({ company })

      this._store.dispatch(action)

      this._store
        .select(companyFeature.selectCompanyState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this._router.navigate([FULL_ROUTE_PATHS.company.list])
            this._store.dispatch(companyActions.loadCompanies())
          }
        })
    }
  }
}
