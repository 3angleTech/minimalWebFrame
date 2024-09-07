import { Injectable, InjectionToken } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';

import { User } from '../data/user.do';
import { ServerApi } from '../enums/server-api.enum';
import { IWebRequestService } from './web-request.interface';
import { IJsonConverterService } from './json-converter.service';

export interface AccountForgotPasswordPayload {
  email: string;
}

export interface AccountResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IAccountService {
  getCurrentUser(): Observable<User>;
  forgotPassword(payload: AccountForgotPasswordPayload): Observable<void>;
  resetPassword(payload: AccountResetPasswordPayload): Observable<void>;
}

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    private readonly webRequest: IWebRequestService,
    private readonly jsonConverter: IJsonConverterService,
  ) {
  }

  public getCurrentUser(): Observable<User> {
    return this.webRequest.get({
      serverApi: ServerApi.AccountMe,
    }).pipe(
      mergeMap((userObject: unknown): Observable<User> => {
        return this.jsonConverter.deserialize(userObject, User);
      }),
    );
  }

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
