import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SkeletonComponent } from '../skeleton/skeleton.component'

/**
 * Skeleton table component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent],
  selector: 'app-skeleton-table',
  styleUrl: './skeleton-table.component.scss',
  templateUrl: './skeleton-table.component.html'
})
export class SkeletonTableComponent {
  @Input() columns = 4
  @Input() rows = 5
}
