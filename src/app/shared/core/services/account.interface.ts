import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAccountCredentials {
  username: string;
  password: string;
}

export interface IAccountService {
  login(credentials: IAccountCredentials): Observable<undefined>;
}

export const IAccountService = new InjectionToken('IAccountService');
