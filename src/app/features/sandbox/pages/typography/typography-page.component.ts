import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typography-page',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyPageComponent { }
