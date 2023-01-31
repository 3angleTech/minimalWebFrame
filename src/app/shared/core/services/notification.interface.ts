import { InjectionToken } from '@angular/core';

export interface INotificationService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  showNotification(key: string | string[], params?: Object | undefined): void;
}
export const INotificationService = new InjectionToken('INotificationService');
