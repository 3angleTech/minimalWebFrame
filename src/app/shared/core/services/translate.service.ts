import { Injectable } from '@angular/core';
import { TranslateService as UpstreamTranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export interface ITranslateService {
  changeLanguage(lang: string): Observable<void>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  translate(key: string | string[], params?: Object | undefined): string;
}

@Injectable()
export class TranslateService implements ITranslateService {
  constructor(
    private readonly translateService: UpstreamTranslateService,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public translate(key: string | string[], params?: Object | undefined): string {
    return this.translateService.instant(key, params);
  }

  public changeLanguage(lang: string): Observable<void> {
    return this.translateService.use(lang);
  }
}
