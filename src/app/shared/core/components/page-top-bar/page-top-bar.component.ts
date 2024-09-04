import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-top-bar',
  templateUrl: './page-top-bar.component.html',
  styleUrl: './page-top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTopBarComponent { }
