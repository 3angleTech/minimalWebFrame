import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '~shared/core';

@Component({
  selector: 'app-logout-page',
  template: '',
})
export class LogoutPageComponent implements OnInit {
  private readonly authService = inject(AuthService);

  public ngOnInit(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = '/';
    });
  }
}
