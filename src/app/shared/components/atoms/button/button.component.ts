import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { ButtonColor, ButtonType, ButtonVariant } from '@app/shared/types/components/atoms/button.types'
import { SpinnerColor } from '@app/shared/types/components/atoms/spinner.types'
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
  @Input() color: ButtonColor = 'primary'
  @Input() disabled = false
  @Input() loading = false
  @Input() margin = ''
  @Input() padding = ''
  @Input() type: ButtonType = 'button'
  @Input() variant: ButtonVariant = 'contained'
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

  get spinnerColor(): SpinnerColor {
    return this.variant === 'contained' ? 'white' : this.color
  }

  handleClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit()
    }
  }
}
