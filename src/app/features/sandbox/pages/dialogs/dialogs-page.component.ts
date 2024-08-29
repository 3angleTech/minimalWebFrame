import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dialogs-page',
  templateUrl: './dialogs-page.component.html',
  styleUrls: ['./dialogs-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogsPageComponent { }
