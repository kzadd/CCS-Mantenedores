import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matArrowDownward, matArrowUpward, matRemoveCircle } from '@ng-icons/material-icons/baseline'

import {
  TableAction,
  TableColumn,
  TableData,
  TableDataKey,
  TableDataValue,
  TableOrder
} from '@app/shared/types/components/table.types'
import { BadgeComponent } from '../badge/badge.component'

const TABLE_ICONS = {
  ascIcon: matArrowUpward,
  descIcon: matArrowDownward,
  noneIcon: matRemoveCircle
}

/**
 * Table component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, NgIcon],
  selector: 'app-table',
  styleUrl: './table.component.scss',
  templateUrl: './table.component.html',
  viewProviders: [provideIcons(TABLE_ICONS)]
})
export class TableComponent<T> {
  @Input() actions: TableAction<T>[] = []
  @Input({ required: true }) columns!: TableColumn<T>[]
  @Input({ required: true }) data!: TableData<T>[]

  private _originalData: TableData<T>[] = []
  sortBy: TableDataKey<T> | null = null
  sortOrder: TableOrder = 'none'

  private _compareValues(a: TableDataValue<T>, b: TableDataValue<T>): number {
    if (a === b) return 0
    if (a === null || a === undefined) return 1
    if (b === null || b === undefined) return -1

    const valueA = typeof a === 'string' ? a.toLowerCase() : a
    const valueB = typeof b === 'string' ? b.toLowerCase() : b

    return valueA < valueB ? -1 : 1
  }

  private _getSortedData(key: TableDataKey<T>): TableData<T>[] {
    return [...this.data].sort((currentRow, nextRow) => {
      const comparison = this._compareValues(currentRow[key], nextRow[key])

      return this.sortOrder === 'desc' ? -comparison : comparison
    })
  }

  private _updateSortOrder(key: TableDataKey<T>): void {
    const isSameColumn = this.sortBy === key

    if (!isSameColumn) {
      this.sortBy = key
      this.sortOrder = 'asc'

      return
    }

    const directions: Record<TableOrder, TableOrder> = {
      asc: 'desc',
      desc: 'none',
      none: 'asc'
    }

    this.sortOrder = directions[this.sortOrder]
  }

  sortData(column: TableColumn<T>): void {
    if (!column.sortable) return

    if (!this._originalData.length) {
      this._originalData = [...this.data]
    }

    this._updateSortOrder(column.key)
    this.data = this.sortOrder === 'none' ? [...this._originalData] : this._getSortedData(column.key)
  }
}
