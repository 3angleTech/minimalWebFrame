import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../data/user.do';

export interface IAccountService {
  getCurrentUser(): Observable<User>;
}

export const IAccountService = new InjectionToken('IAccountService');
