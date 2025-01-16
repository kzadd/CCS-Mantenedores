import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Welcome container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-welcome-container',
  styleUrl: './welcome-container.component.scss',
  templateUrl: './welcome-container.component.html'
})
export class WelcomeContainerComponent {}
