import { HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ServerApi } from '../enums/server-api.enum';
import { IWebRequestService, RequestContentType } from './web-request.interface';

export interface IAccountCredentials {
  username: string;
  password: string;
}

export interface ITokenPayload {
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthService {
  login(credentials: IAccountCredentials): Observable<ITokenPayload>;
  refreshToken(): Observable<ITokenPayload>;
  logout(): Observable<unknown>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly webRequest: IWebRequestService,
  ) {
  }

  public login(credentials: IAccountCredentials): Observable<ITokenPayload> {
    const bodyData = new HttpParams({
      fromObject: {
        username: credentials.username,
        password: credentials.password,
        grant_type: 'password',
      },
    });

    return this.webRequest.post<ITokenPayload>({
      serverApi: ServerApi.AuthToken,
      contentType: RequestContentType.ApplicationWWWFormUrlEncoded,
      body: bodyData.toString(),
    });
  }

  public refreshToken(): Observable<ITokenPayload> {
    const bodyData = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
      },
    });

    return this.webRequest.post({
      serverApi: ServerApi.AuthToken,
      contentType: RequestContentType.ApplicationWWWFormUrlEncoded,
      body: bodyData,
    });
  }

  public logout(): Observable<unknown> {
    return this.webRequest.get<unknown>({
      serverApi: ServerApi.AuthLogout,
    });
  }
}
