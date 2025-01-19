import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

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
  @Input() height = '2.75rem'
  @Input() margin = ''
  @Input() padding = ''
  @Input() width = '100%'

  get skeletonStyles(): Record<string, string> {
    return {
      height: this.height,
      margin: this.margin,
      padding: this.padding,
      width: this.width
    }
  }
}
