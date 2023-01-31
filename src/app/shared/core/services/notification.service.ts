import { Injectable } from '@angular/core';

import { INotificationService } from './notification.interface';
import { ITranslateService } from './translate.interface';

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
