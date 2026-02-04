import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-shell',
  templateUrl: './account-shell.component.html',
  styleUrls: ['./account-shell.component.scss'],
  imports: [RouterOutlet],
})
export class AccountShellComponent {
  @HostBinding('class.app-account-shell')
  public componentClass: boolean = true;
}
