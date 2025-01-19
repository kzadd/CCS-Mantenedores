import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SkeletonAnimation, SkeletonVariant } from '@app/shared/types/components/skeleton.types'

/**
 * Skeleton component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-skeleton',
  styleUrl: './skeleton.component.scss',
  templateUrl: './skeleton.component.html'
})
export class SkeletonComponent {
  @Input() animation: SkeletonAnimation = 'wave'
  @Input() height = ''
  @Input() margin = ''
  @Input() padding = ''
  @Input() variant: SkeletonVariant = 'text'
  @Input() width = ''

  get skeletonClasses(): string {
    return `skeleton skeleton--${this.animation} skeleton--${this.variant}`
  }

  get skeletonStyles(): Record<string, string> {
    return {
      margin: this.margin,
      padding: this.padding,
      width: this.width
    }
  }
}
