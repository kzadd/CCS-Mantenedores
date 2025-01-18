import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SpinnerColor } from '@app/shared/types/components/spinner.types'

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
  @Input() color: SpinnerColor = 'primary'
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
