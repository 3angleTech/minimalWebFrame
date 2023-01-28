import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerApi } from '../enums/server-api.enum';
import { IAccountCredentials, IAccountService } from './account.interface';
import { IWebRequestService, RequestContentType } from './web-request.interface';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    private readonly webRequest: IWebRequestService,
  ) {
  }

  public login(credentials: IAccountCredentials): Observable<undefined> {
    const bodyData = new HttpParams({
      fromObject: {
        username: credentials.username,
        password: credentials.password,
        grant_type: 'password',
      },
    });

    return this.webRequest.post<undefined>({
      serverApi: ServerApi.AuthToken,
      contentType: RequestContentType.ApplicationWWWFormUrlEncoded,
      body: bodyData.toString(),
    });
  }

}
