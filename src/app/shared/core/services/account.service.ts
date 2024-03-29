import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';

import { User } from '../data/user.do';
import { ServerApi } from '../enums/server-api.enum';
import { IAccountService } from './account.interface';
import { IJsonConverterService } from './json-converter.interface';
import { IWebRequestService } from './web-request.interface';

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
}
