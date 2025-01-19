import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { TableAction, TableColumn } from '@app/shared/types/components/table.types'
import { AppError } from '@app/shared/types/exception.types'
import { SkeletonTableComponent } from '../../skeleton-table/skeleton-table.component'
import { TableComponent } from '../../table/table.component'
import { ToastComponent } from '../../toast/toast.component'

/**
 * Crud table component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonTableComponent, TableComponent, ToastComponent],
  selector: 'app-crud-table',
  styleUrl: './crud-table.component.scss',
  templateUrl: './crud-table.component.html'
})
export class CrudTableComponent<T> {
  @Input({ required: true }) actions!: TableAction<T>[]
  @Input({ required: true }) columns!: TableColumn<T>[]
  @Input({ required: true }) data!: T[]
  @Input({ required: true }) error!: AppError | null
  @Input({ required: true }) loading!: boolean
}
