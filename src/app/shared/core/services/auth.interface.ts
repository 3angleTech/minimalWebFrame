import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

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

export const IAuthService = new InjectionToken('IAuthService');
