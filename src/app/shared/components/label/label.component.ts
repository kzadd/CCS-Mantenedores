import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

/**
 * Label component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-label',
  styleUrl: './label.component.scss',
  templateUrl: './label.component.html'
})
export class LabelComponent {
  @Input() id = ''
  @Input({ required: true }) label!: string
  @Input() required = false
}
