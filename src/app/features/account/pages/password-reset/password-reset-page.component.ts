import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FormAlert, FormAlertType, getFormAlertsFromHttpErrorResponse, INavigationService, PageUrl } from '~shared/core';

import { AccountResetPasswordPayload, IAccountService } from '../../services/account.interface';

interface ResetPasswordForm {
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss'],
})
export class PasswordResetPageComponent implements OnInit {
  public resetPasswordForm!: FormGroup<ResetPasswordForm>;
  public resetPasswordFormAlerts!: FormAlert[];

  private resetToken!: string;

  constructor(
    private readonly navigationService: INavigationService,
    private readonly accountService: IAccountService,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.resetToken = this.activatedRoute.snapshot.queryParamMap.get('token') || '';
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.resetPasswordForm.disabled) {
      return;
    }
    this.resetPasswordForm.disable();

    const resetPasswordPayload: AccountResetPasswordPayload = {
      token: this.resetToken,
      newPassword: this.resetPasswordForm.value.newPassword as string,
      confirmPassword: this.resetPasswordForm.value.confirmPassword as string,
    };

    this.accountService.resetPassword(resetPasswordPayload).subscribe({
      error: (err: Error): void => this.onResetError(err),
      complete: (): void => this.onResetComplete(),
    });
  }

  private onResetComplete(): void {
    this.resetPasswordFormAlerts = [
      { message: 'ACCOUNT_FEATURE.RESET_PASSWORD.SUCCESS_DESCRIPTION', type: FormAlertType.Success },
    ];
    this.navigationService.navigateToUrl(PageUrl.LOGIN_PAGE);
  }

  private onResetError(err: Error): void {
    this.resetPasswordForm.enable();
    this.resetPasswordFormAlerts = getFormAlertsFromHttpErrorResponse(err);
    this.resetPasswordForm.markAsUntouched();
  }
}
