import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import {
  AccountForgotPasswordPayload,
  AccountService,
  FormAlert,
  getFormAlertsFromHttpErrorResponse,
  NavigationService,
  PageUrl,
} from '~shared/core';

interface ForgotPasswordForm {
  email: FormControl<string>;
}

@Component({
  selector: 'app-password-forgot-page',
  templateUrl: './password-forgot-page.component.html',
  styleUrls: ['./password-forgot-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordForgotPageComponent implements OnInit {
  public forgotPasswordForm!: FormGroup<ForgotPasswordForm>;
  public forgotPasswordFormAlerts!: FormAlert[];
  public forgotPasswordFormSubmitted: boolean = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly accountService: AccountService,
  ) {}

  public ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.forgotPasswordForm.disabled) {
      return;
    }
    this.forgotPasswordForm.disable();

    const payload: AccountForgotPasswordPayload = {
      email: <string> this.forgotPasswordForm.value.email,
    };
    this.accountService.forgotPassword(payload).subscribe({
      error: (err: unknown): void => this.onLoginError(err),
      complete: (): void => this.onLoginComplete(),
    });
  }

  private onLoginComplete(): void {
    this.navigationService.navigateToUrl(PageUrl.PROFILE_PAGE);
  }

  private onLoginError(err: unknown): void {
    this.forgotPasswordForm.enable();
    this.forgotPasswordFormAlerts = getFormAlertsFromHttpErrorResponse(err);
    this.forgotPasswordForm.markAsUntouched();
  }
}
