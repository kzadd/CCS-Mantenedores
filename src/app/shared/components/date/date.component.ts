import { ChangeDetectionStrategy, Component, forwardRef, Input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { parse } from 'date-fns'

import { LabelComponent } from '../label/label.component'

const CONTROL_VALUE_ACCESSOR = {
  multi: true,
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateComponent)
}

/**
 * Date component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LabelComponent],
  providers: [CONTROL_VALUE_ACCESSOR],
  selector: 'app-date',
  styleUrl: './date.component.scss',
  templateUrl: './date.component.html'
})
export class DateComponent implements ControlValueAccessor {
  @Input() disabled = false
  @Input() error = ''
  @Input() id = ''
  @Input() isRequired = false
  @Input() label = ''
  @Input() name = ''
  @Input() placeholder = ''

  value = signal<string | null>(null)

  get dateFieldClasses(): string[] {
    return ['date__field', this.disabled ? 'date__field--disabled' : '', this.error ? 'date__field--error' : ''].filter(
      Boolean
    )
  }

  onChange: (value: string | null) => void = () => {}

  onDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement

    this.value.set(inputElement.value)
    this.onChange(inputElement.value)
    this.onTouched()
  }

  onTouched: () => void = () => {}

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.value.set(null)

      return
    }

    const parsedDate = parse(value, 'dd/MM/yyyy', new Date())

    if (isNaN(parsedDate.getTime())) {
      this.value.set(null)

      return
    }

    const formattedDate = parsedDate.toISOString().substring(0, 10)

    this.value.set(formattedDate)
    this.onChange(formattedDate)
  }
}
