import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { DetailConfig } from '@app/shared/types/components/customs/crud-detail.types'
import { AppError } from '@app/shared/types/exception.types'
import { BadgeComponent } from '../../badge/badge.component'
import { LabelComponent } from '../../label/label.component'
import { SkeletonComponent } from '../../skeleton/skeleton.component'
import { ToastComponent } from '../../toast/toast.component'

/**
 * Crud detail component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, LabelComponent, SkeletonComponent, ToastComponent],
  selector: 'app-crud-detail',
  styleUrl: './crud-detail.component.scss',
  templateUrl: './crud-detail.component.html'
})
export class CrudDetailComponent<T> {
  @Input({ required: true }) config!: DetailConfig<T>[]
  @Input({ required: true }) error!: AppError | null
  @Input({ required: true }) loading!: boolean
}
