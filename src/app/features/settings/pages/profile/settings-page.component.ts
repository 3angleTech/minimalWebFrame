import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent extends BasePageComponent implements OnInit {
  constructor(
  ) {
    super();
  }

  public ngOnInit(): void {
  }
}
