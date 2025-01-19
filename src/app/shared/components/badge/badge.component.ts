import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { BadgeColor } from '@app/shared/types/components/badge.types'

/**
 * Badge component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-badge',
  styleUrl: './badge.component.scss',
  templateUrl: './badge.component.html'
})
export class BadgeComponent {
  @Input() color: BadgeColor = 'primary'
  @Input({ required: true }) label!: string

  get badgeClasses(): string {
    return `badge badge--${this.color}`
  }
}
