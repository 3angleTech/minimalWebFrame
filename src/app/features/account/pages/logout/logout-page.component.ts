import { Component, OnInit } from '@angular/core';
import { AuthService } from '~shared/core';

@Component({
  selector: 'app-logout-page',
  template: '',
})
export class LogoutPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = '/';
    });
  }
}
