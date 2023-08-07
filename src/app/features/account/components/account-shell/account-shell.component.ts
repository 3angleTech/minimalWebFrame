import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-account-shell',
  templateUrl: './account-shell.component.html',
  styleUrls: ['./account-shell.component.scss'],
})
export class AccountShellComponent {
  @HostBinding('class.app-account-shell')
  public componentClass: boolean = true;
}
