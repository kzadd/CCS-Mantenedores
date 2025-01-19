import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  matKeyboardArrowLeft,
  matKeyboardArrowRight,
  matKeyboardDoubleArrowLeft,
  matKeyboardDoubleArrowRight
} from '@ng-icons/material-icons/baseline'

import { PaginationPage } from '@app/shared/types/components/pagination.types'
import { ButtonComponent } from '../button/button.component'

const PAGINATION_ICONS = {
  firstIcon: matKeyboardDoubleArrowLeft,
  lastIcon: matKeyboardDoubleArrowRight,
  nextIcon: matKeyboardArrowRight,
  prevIcon: matKeyboardArrowLeft
}

/**
 * Pagination component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgIcon],
  selector: 'app-pagination',
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
  viewProviders: [provideIcons(PAGINATION_ICONS)]
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1
  @Input() totalPages = 1
  @Output() pageChange = new EventEmitter<number>()

  pages: PaginationPage[] = []

  ngOnChanges(): void {
    this._generatePageNumbers()
  }

  private _addPageRange(pages: PaginationPage[], start: number, end: number): void {
    pages.push(...Array.from({ length: end - start + 1 }, (_, index) => start + index))
  }

  private _generatePageNumbers(): void {
    if (this.totalPages <= 7) {
      this.pages = Array.from({ length: this.totalPages }, (_, index) => index + 1)

      return
    }

    const pages: PaginationPage[] = []
    const showRange = 2

    pages.push(1)

    if (this.currentPage <= showRange + 2) {
      this._addPageRange(pages, 2, 5)
      pages.push('...', this.totalPages)
    } else if (this.currentPage >= this.totalPages - (showRange + 1)) {
      pages.push('...')
      this._addPageRange(pages, this.totalPages - 4, this.totalPages - 1)
      pages.push(this.totalPages)
    } else {
      pages.push('...')
      this._addPageRange(pages, this.currentPage - 1, this.currentPage + 1)
      pages.push('...', this.totalPages)
    }

    this.pages = pages
  }

  changePage(page: number): void {
    if (page <= this.totalPages && page > 0 && typeof page === 'number') {
      this.pageChange.emit(page)
    }
  }
}
