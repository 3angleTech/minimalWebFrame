import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import {
  FormAlert,
  getFormAlertFromHttpErrorResponse,
  IAuthService,
  INavigationService,
  INotificationService,
  PageUrl,
} from '~shared/core';
import { AccountForgotPasswordPayload, IAccountService } from '../../services/account.interface';

interface ForgotPasswordForm {
  email: FormControl<string>;
}

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordForgotComponent implements OnInit {
  public forgotPasswordForm!: FormGroup<ForgotPasswordForm>;
  public forgotPasswordFormAlerts!: FormAlert[];
  public forgotPasswordFormSubmitted: boolean = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly notificationService: INotificationService,
    private readonly authService: IAuthService,
    private readonly navigationService: INavigationService,
    private readonly accountService: IAccountService,
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
    this.forgotPasswordFormAlerts = getFormAlertFromHttpErrorResponse(err);
    this.forgotPasswordForm.markAsUntouched();
  }
}
