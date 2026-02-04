import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AccountResetPasswordPayload, AccountService, FormAlert, FormAlertsComponent, FormAlertType, FormControlErrorsComponent, getFormAlertsFromHttpErrorResponse, NavigationService, PageUrl } from '~shared/core';

interface ResetPasswordForm {
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss'],
  imports: [ReactiveFormsModule, TranslateModule, FormAlertsComponent, FormControlErrorsComponent],
})
export class PasswordResetPageComponent implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly accountService = inject(AccountService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);

  public resetPasswordForm!: FormGroup<ResetPasswordForm>;
  public resetPasswordFormAlerts!: FormAlert[];

  private resetToken!: string;


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
