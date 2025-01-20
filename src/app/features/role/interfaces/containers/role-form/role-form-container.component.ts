import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { roleActions } from '@app/features/role/application/role.actions'
import { roleFeature } from '@app/features/role/application/role.feature'
import { RoleForm, RoleFormViewMode, RoleKey } from '@app/features/role/domain/role.entity'
import { ButtonComponent, InputComponent, ToastComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isNumber, isRequired } from '@app/shared/utils/validators.utils'

/**
 * Role form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, ToastComponent],
  selector: 'app-role-form-container',
  styleUrl: './role-form-container.component.scss',
  templateUrl: './role-form-container.component.html'
})
export class RoleFormContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: RoleFormViewMode

  role = toSignal(this._store.select(roleFeature.selectRole), { initialValue: null })
  error = toSignal(this._store.select(roleFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(roleFeature.selectLoading), { initialValue: false })

  form: FormGroup<RoleForm> = this._formBuilder.group<RoleForm>({
    id: this._formBuilder.control('', [isRequired, isNumber])
  })

  get submitButtonLabel(): string {
    return this.mode === 'edit' ? 'Actualizar rol' : 'Crear rol'
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const id = this._route.snapshot.params['id']

      this._store.dispatch(roleActions.loadRole({ id }))

      this._store
        .select(roleFeature.selectRoleState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error && state.role) {
            this.form.patchValue(state.role)
          }
        })

      this.form.get('id')?.disable()
    }

    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this._store.dispatch(roleActions.clearError())
      }
    })
  }

  getErrorMessage(controlName: RoleKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSubmit() {
    if (this.form.valid) {
      const id = this._route.snapshot.params['id']
      const role = this.form.getRawValue()
      const action = this.mode === 'edit' ? roleActions.updateRole({ id, role }) : roleActions.createRole({ role })

      this._store.dispatch(action)

      this._store
        .select(roleFeature.selectRoleState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this._router.navigate([FULL_ROUTE_PATHS.role.list])
            this._store.dispatch(roleActions.loadRoles())
          }
        })
    }
  }
}
