import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { NgIcon } from '@ng-icons/core'

import { HeadingConfig, HeadingConfigItem } from '@app/shared/types/components/customs/crud-heading.types'
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component'
import { ButtonComponent } from '../../button/button.component'

/**
 * Crud heading component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, ButtonComponent, NgIcon],
  selector: 'app-crud-heading',
  styleUrl: './crud-heading.component.scss',
  templateUrl: './crud-heading.component.html'
})
export class CrudHeadingComponent<T extends string> implements OnInit {
  @Input({ required: true }) config!: HeadingConfig<T>
  @Input() loading = false
  @Input({ required: true }) mode!: T

  activeConfig!: HeadingConfigItem

  ngOnInit(): void {
    if (this.mode in this.config) {
      this.activeConfig = this.config[this.mode]
    }
  }
}
