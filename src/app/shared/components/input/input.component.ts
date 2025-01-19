import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'

import { InputType } from '@app/shared/types/components/input.types'
import { LabelComponent } from '../label/label.component'

const CONTROL_VALUE_ACCESSOR = {
  multi: true,
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent)
}

/**
 * Input component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LabelComponent, ReactiveFormsModule],
  providers: [CONTROL_VALUE_ACCESSOR],
  selector: 'app-input',
  styleUrl: './input.component.scss',
  templateUrl: './input.component.html'
})
export class InputComponent implements ControlValueAccessor {
  @Input() disabled = false
  @Input() error = ''
  @Input() id = ''
  @Input() isRequired = false
  @Input() label = ''
  @Input() name = ''
  @Input() placeholder = ''
  @Input() type: InputType = 'text'
  @Input() value = ''

  hasSuffix = false

  get inputFieldClasses(): string[] {
    return [
      'input__field',
      this.disabled ? 'input__field--disabled' : '',
      this.error ? 'input__field--error' : ''
    ].filter(Boolean)
  }

  onChange: (value: string) => void = () => {}

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement

    this.value = inputElement.value
    this.onChange(inputElement.value)
    this.onTouched()
  }

  onTouched: () => void = () => {}

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: string): void {
    this.value = value ?? ''
  }
}
