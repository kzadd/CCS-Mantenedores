import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SpinnerColors } from '@app/shared/types/components/atoms/spinner.types'

/**
 * Spinner component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-spinner',
  styleUrl: './spinner.component.scss',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  @Input() color: SpinnerColors = 'primary'
  @Input() size = '44px'

  get spinnerClasses(): string {
    return `spinner spinner--${this.color}`
  }

  get spinnerStyles(): Record<string, string> {
    const borderWidth = `calc(${this.size} / 10)`

    return {
      borderWidth,
      height: this.size,
      width: this.size
    }
  }
}
