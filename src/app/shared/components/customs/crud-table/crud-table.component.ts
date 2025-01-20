import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matSearch } from '@ng-icons/material-icons/baseline'

import { TableAction, TableColumn, TableDataKey } from '@app/shared/types/components/table.types'
import { AppError } from '@app/shared/types/exception.types'
import { InputComponent } from '../../input/input.component'
import { PaginationComponent } from '../../pagination/pagination.component'
import { SkeletonTableComponent } from '../../skeleton-table/skeleton-table.component'
import { TableComponent } from '../../table/table.component'
import { ToastComponent } from '../../toast/toast.component'

const CRUD_TABLE_ICONS = {
  searchIcon: matSearch
}

/**
 * Crud table component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    InputComponent,
    NgIcon,
    PaginationComponent,
    SkeletonTableComponent,
    TableComponent,
    ToastComponent
  ],
  selector: 'app-crud-table',
  styleUrl: './crud-table.component.scss',
  templateUrl: './crud-table.component.html',
  viewProviders: [provideIcons(CRUD_TABLE_ICONS)]
})
export class CrudTableComponent<T> {
  @Input({ required: true }) actions!: TableAction<T>[]
  @Input({ required: true }) columns!: TableColumn<T>[]
  @Input({ required: true }) data!: T[]
  @Input({ required: true }) error!: AppError | null
  @Input() filterableBy: TableDataKey<T>[] = []
  @Input({ required: true }) loading!: boolean
  @Input() pageSize = 10

  currentPage = 1
  private _searchTerm = ''

  get filteredData(): T[] {
    const filteredItems = this._getFilteredItems(this._searchTerm)

    return this._getPaginatedItems(filteredItems)
  }

  get searchTerm(): string {
    return this._searchTerm
  }

  set searchTerm(value: string) {
    this._searchTerm = value.toLowerCase()
    this.currentPage = 1
  }

  get totalPages(): number {
    const filteredItems = this._getFilteredItems(this._searchTerm)

    return Math.ceil(filteredItems.length / this.pageSize)
  }

  private _getFilteredItems(searchTerm: string): T[] {
    return this.data.filter(item => {
      const keys = this.filterableBy.length ? this.filterableBy : (Object.keys(item as object) as TableDataKey<T>[])

      return keys.some(key => String(item[key]).toLowerCase().includes(searchTerm))
    })
  }

  private _getPaginatedItems(items: T[]): T[] {
    const startIndex = (this.currentPage - 1) * this.pageSize

    return items.slice(startIndex, startIndex + this.pageSize)
  }

  changePage(page: number): void {
    this.currentPage = page
  }
}
