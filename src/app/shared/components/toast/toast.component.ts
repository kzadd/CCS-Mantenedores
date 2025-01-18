import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIcon } from '@ng-icons/core'
import { matCheckCircle, matError, matHelp, matInfo, matWarning } from '@ng-icons/material-icons/baseline'

import { ToastColors, ToastTextDirection } from '@app/shared/types/components/toast.types'

const TOAST_ICONS = {
  defaultIcon: matHelp,
  errorIcon: matError,
  infoIcon: matInfo,
  successIcon: matCheckCircle,
  warningIcon: matWarning
}

/**
 * Toast component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  selector: 'app-toast',
  styleUrl: './toast.component.scss',
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  @Input() margin = ''
  @Input() padding = ''
  @Input() severity: ToastColors = 'primary'
  @Input() textDirection: ToastTextDirection = 'horizontal'
  @Input() title = ''
  @Input() width = 'auto'

  get toastIcon(): string {
    switch (this.severity) {
      case 'default':
        return TOAST_ICONS.defaultIcon
      case 'error':
        return TOAST_ICONS.errorIcon
      case 'primary':
        return TOAST_ICONS.infoIcon
      case 'secondary':
        return TOAST_ICONS.infoIcon
      case 'success':
        return TOAST_ICONS.successIcon
      case 'warning':
        return TOAST_ICONS.warningIcon
      default:
        return TOAST_ICONS.defaultIcon
    }
  }

  get toastClasses(): string[] {
    return ['toast', `toast--${this.severity}`, `toast__direction--${this.textDirection}`].filter(Boolean)
  }

  get toastStyles(): Record<string, string> {
    return {
      margin: this.margin,
      padding: this.padding,
      width: this.width
    }
  }
}
