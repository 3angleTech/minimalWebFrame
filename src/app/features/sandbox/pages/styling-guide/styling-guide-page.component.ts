import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';

@Component({
  selector: 'app-styling-guide-page',
  templateUrl: './styling-guide-page.component.html',
  styleUrls: ['./styling-guide-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylingGuidePageComponent extends BasePageComponent {
}
