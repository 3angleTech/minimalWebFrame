import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AccountForgotPasswordPayload, AccountService, FormAlert, FormAlertsComponent, FormControlErrorsComponent, getFormAlertsFromHttpErrorResponse, NavigationService, PageUrl } from '~shared/core';

interface ForgotPasswordForm {
  email: FormControl<string>;
}

@Component({
  selector: 'app-password-forgot-page',
  templateUrl: './password-forgot-page.component.html',
  styleUrls: ['./password-forgot-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, FormControlErrorsComponent, FormAlertsComponent],
})
export class PasswordForgotPageComponent implements OnInit {
  public forgotPasswordForm!: FormGroup<ForgotPasswordForm>;
  public forgotPasswordFormAlerts!: FormAlert[];
  public forgotPasswordFormSubmitted: boolean = false;

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly navigationService = inject(NavigationService);
  private readonly accountService = inject(AccountService);

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
