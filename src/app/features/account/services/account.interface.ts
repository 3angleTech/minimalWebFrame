import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface AccountForgotPasswordPayload {
  email: string;
}

export interface AccountResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IAccountService {
  forgotPassword(payload: AccountForgotPasswordPayload): Observable<void>;
  resetPassword(payload: AccountResetPasswordPayload): Observable<void>;
}
export const IAccountService = new InjectionToken('IAccountService');
