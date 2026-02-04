import { Component } from '@angular/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';
import { PageTopBarComponent } from '~shared/core/components/page-top-bar/page-top-bar.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  imports: [PageTopBarComponent],
})
export class SettingsPageComponent extends BasePageComponent {
  constructor(
  ) {
    super();
  }
}
