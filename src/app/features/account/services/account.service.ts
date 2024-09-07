import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWebRequestService, ServerApi } from '~shared/core';
import { AccountForgotPasswordPayload, AccountResetPasswordPayload, IAccountService } from './account.interface';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    private readonly webRequest: IWebRequestService,
  ) { }

  public forgotPassword(payload: AccountForgotPasswordPayload): Observable<void> {
    return this.webRequest.post<void>({
      serverApi: ServerApi.AccountForgotPassword,
      body: payload,
    }).pipe(
      map(() => undefined),
    );
  }

  public resetPassword(payload: AccountResetPasswordPayload): Observable<void> {
    return this.webRequest.post<void>({
      serverApi: ServerApi.AccountResetPassword,
      body: payload,
    }).pipe(
      map(() => undefined),
    );
  }
}
