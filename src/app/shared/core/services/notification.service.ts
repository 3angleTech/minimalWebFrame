import { inject, Injectable } from '@angular/core';
import { TranslateService } from './translate.service';

export interface INotificationService {
  showNotification(key: string | string[], params?: Record<string, unknown>): void;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements INotificationService {
  private readonly translateService = inject(TranslateService);

  /**
   * TODO: Properly implement the notification service.
   */
  public showNotification(key: string | string[], params?: Record<string, unknown>): void {
    const translatedMessage = this.translateService.translate(key, params);

    window.alert(translatedMessage);
  }
}
