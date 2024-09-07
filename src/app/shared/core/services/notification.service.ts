import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';

export interface INotificationService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  showNotification(key: string | string[], params?: Object | undefined): void;
}

@Injectable()
export class NotificationService implements INotificationService {

  constructor(
    private readonly translateService: TranslateService,
  ) { }

  /**
   * TODO: Properly implement the notification service.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public showNotification(key: string | string[], params?: Object | undefined): void {
    const translatedMessage = this.translateService.translate(key, params);

    alert(translatedMessage);
  }
}
