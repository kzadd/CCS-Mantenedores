import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { ButtonColors, ButtonTypes, ButtonVariants } from '@app/shared/types/components/button.types'
import { SpinnerColors } from '@app/shared/types/components/spinner.types'
import { SpinnerComponent } from '../spinner/spinner.component'

/**
 * Button component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpinnerComponent],
  selector: 'app-button',
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() color: ButtonColors = 'primary'
  @Input() disabled = false
  @Input() loading = false
  @Input() margin = ''
  @Input() padding = ''
  @Input() type: ButtonTypes = 'button'
  @Input() variant: ButtonVariants = 'contained'
  @Input() width = 'initial'
  @Output() buttonClick = new EventEmitter<void>()

  get buttonClasses(): string[] {
    return [
      'button',
      `button--${this.color}`,
      `button--${this.variant}`,
      this.disabled ? 'button--disabled' : ''
    ].filter(Boolean)
  }

  get buttonStyles(): Record<string, string> {
    return {
      margin: this.margin,
      padding: this.padding,
      width: this.width
    }
  }

  get spinnerColor(): SpinnerColors {
    return this.variant === 'contained' ? 'white' : this.color
  }

  handleClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit()
    }
  }
}
