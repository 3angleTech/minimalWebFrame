import { Component, OnInit } from '@angular/core';
import { environment } from '~environment/environment';
import { IAuthService } from '~shared/core';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private readonly authService: IAuthService,
  ) {}

  public ngOnInit(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = environment.appBaseUrl;
    });
  }
}
