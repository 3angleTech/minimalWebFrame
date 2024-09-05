import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';

@Component({
  selector: 'app-typography-page',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyPageComponent extends BasePageComponent {
}
