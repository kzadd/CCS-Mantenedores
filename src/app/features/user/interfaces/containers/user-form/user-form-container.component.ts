import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { userActions } from '@app/features/user/application/user.actions'
import { userFeature } from '@app/features/user/application/user.feature'
import { UserForm, UserFormViewMode, UserKey } from '@app/features/user/domain/user.entity'
import { ButtonComponent, InputComponent, ToastComponent } from '@app/shared/components'
import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isNumber, isRequired } from '@app/shared/utils/validators.utils'

/**
 * User form container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, ToastComponent],
  selector: 'app-user-form-container',
  styleUrl: './user-form-container.component.scss',
  templateUrl: './user-form-container.component.html'
})
export class UserFormContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _store = inject(Store)

  @Input({ required: true }) mode!: UserFormViewMode

  user = toSignal(this._store.select(userFeature.selectUser), { initialValue: null })
  error = toSignal(this._store.select(userFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(userFeature.selectLoading), { initialValue: false })

  form: FormGroup<UserForm> = this._formBuilder.group<UserForm>({
    id: this._formBuilder.control('', [isRequired, isNumber])
  })

  get submitButtonLabel(): string {
    return this.mode === 'edit' ? 'Actualizar usuario' : 'Crear usuario'
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      const id = this._route.snapshot.params['id']

      this._store.dispatch(userActions.loadUser({ id }))

      this._store
        .select(userFeature.selectUserState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error && state.user) {
            this.form.patchValue(state.user)
          }
        })

      this.form.get('id')?.disable()
    }

    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this._store.dispatch(userActions.clearError())
      }
    })
  }

  getErrorMessage(controlName: UserKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSubmit() {
    if (this.form.valid) {
      const id = this._route.snapshot.params['id']
      const user = this.form.getRawValue()

      const action = this.mode === 'edit' ? userActions.updateUser({ id, user }) : userActions.createUser({ user })

      this._store.dispatch(action)

      this._store
        .select(userFeature.selectUserState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this._router.navigate([FULL_ROUTE_PATHS.user.list])
            this._store.dispatch(userActions.loadUsers())
          }
        })
    }
  }
}
