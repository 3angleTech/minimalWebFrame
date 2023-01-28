import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITranslateService {
  changeLanguage(lang: string): Observable<void>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  translate(key: string | string[], params?: Object | undefined): string;
}

export const ITranslateService = new InjectionToken('ITranslateService');
