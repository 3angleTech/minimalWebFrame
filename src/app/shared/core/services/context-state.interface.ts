import { InjectionToken } from '@angular/core';

export interface IContextStateService {
  isAuthenticated(): boolean;
}

export const IContextStateService = new InjectionToken('IContextStateService');
