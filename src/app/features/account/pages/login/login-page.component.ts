import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import {
  FormAlert,
  getFormAlertsFromHttpErrorResponse,
  IAccountCredentials,
  IAuthService,
  NavigationService,
  PageUrl,
} from '~shared/core';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  public loginFormAlerts!: FormAlert[];

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly authService: IAuthService,
    private readonly navigationService: NavigationService,
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.disabled) {
      return;
    }

    this.loginForm.disable();
    const credentials: IAccountCredentials = this.loginForm.getRawValue();
    this.authService.login(credentials).subscribe({
      error: (err: unknown): void => this.onLoginError(err),
      complete: (): void => this.onLoginComplete(),
    });
  }

  private onLoginComplete(): void {
    this.navigationService.navigateToUrl(PageUrl.PROFILE_PAGE);
  }

  private onLoginError(err: unknown): void {
    this.loginForm.enable();
    if (err instanceof HttpErrorResponse) {
      this.loginFormAlerts = getFormAlertsFromHttpErrorResponse(err);
      this.loginForm.markAsUntouched();
    } else {
      throw err;
    }
  }
}
