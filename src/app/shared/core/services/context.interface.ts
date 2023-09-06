import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../data/user.do';

export interface IContextService {
  currentUser: BehaviorSubject<User | undefined>;

  isAuthenticated(): boolean;
  refreshUser(): Promise<void>;
}

export const IContextService = new InjectionToken('IContextService');
