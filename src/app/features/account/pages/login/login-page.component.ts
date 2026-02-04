import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, FormAlert, FormAlertsComponent, FormControlErrorsComponent, getFormAlertsFromHttpErrorResponse, IAccountCredentials, NavigationService, PageUrl } from '~shared/core';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontAwesomeModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    FormAlertsComponent,
    FormControlErrorsComponent,
    FaIconComponent,
  ],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  public loginFormAlerts!: FormAlert[];

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(NavigationService);

  faLockOpen = faLockOpen;
  faUser = faUser;

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
