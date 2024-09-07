import { Injectable, InjectionToken } from '@angular/core';
import { ITranslateService } from './translate.service';

export interface INotificationService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  showNotification(key: string | string[], params?: Object | undefined): void;
}
export const INotificationService = new InjectionToken('INotificationService');

@Injectable()
export class NotificationService implements INotificationService {

  constructor(
    private readonly translateService: ITranslateService,
  ) {}

  /**
   * TODO: Properly implement the notification service.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public showNotification(key: string | string[], params?: Object | undefined): void {
    const translatedMessage = this.translateService.translate(key, params);

    alert(translatedMessage);
  }
}
