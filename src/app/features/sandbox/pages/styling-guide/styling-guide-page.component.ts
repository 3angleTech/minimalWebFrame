import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';
import { PageTopBarComponent } from '~shared/core/components/page-top-bar/page-top-bar.component';

@Component({
  selector: 'app-styling-guide-page',
  templateUrl: './styling-guide-page.component.html',
  styleUrls: ['./styling-guide-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTopBarComponent],
})
export class StylingGuidePageComponent extends BasePageComponent {
}
