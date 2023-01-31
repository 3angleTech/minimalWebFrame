import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../data/user.do';

export interface IContextService {
  currentUser: BehaviorSubject<User | undefined>;

  isAuthenticated(): Promise<boolean>;
}

export const IContextService = new InjectionToken('IContextService');
