import { ChangeDetectionStrategy, Component, forwardRef, Input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

const CONTROL_VALUE_ACCESSOR = {
  multi: true,
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent)
}

/**
 * Checkbox component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [CONTROL_VALUE_ACCESSOR],
  selector: 'app-checkbox',
  styleUrl: './checkbox.component.scss',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() disabled = true
  @Input() id = ''
  @Input() label = ''
  @Input() name = ''

  value = signal<boolean>(false)

  get checkboxFieldClasses(): string[] {
    return ['checkbox-input__field', this.disabled ? 'checkbox-input__field--disabled' : ''].filter(Boolean)
  }

  onChange: (value: boolean) => void = () => {}

  onCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement

    this.value.set(inputElement.checked)
    this.onChange(inputElement.checked)
    this.onTouched()
  }

  onTouched: () => void = () => {}

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: boolean): void {
    this.value.set(value)
  }
}
