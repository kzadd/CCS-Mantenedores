import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIcon } from '@ng-icons/core'

import { TableAction, TableColumn, TableData } from '@app/shared/types/components/table.types'
import { BadgeComponent } from '../badge/badge.component'

/**
 * Table component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, NgIcon],
  selector: 'app-table',
  styleUrl: './table.component.scss',
  templateUrl: './table.component.html'
})
export class TableComponent<T> {
  @Input() actions: TableAction<T>[] = []
  @Input({ required: true }) columns!: TableColumn<T>[]
  @Input({ required: true }) data!: TableData<T>[]
}
