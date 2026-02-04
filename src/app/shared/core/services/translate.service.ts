import { inject, Injectable } from '@angular/core';
import { TranslateService as UpstreamTranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

export interface ITranslateService {
  changeLanguage(lang: string): Observable<void>;
  translate(key: string | string[], params?: Record<string, unknown>): string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslateService implements ITranslateService {
  private readonly upstreamTranslateService = inject(UpstreamTranslateService);

  public translate(key: string | string[], params?: Record<string, unknown>): string {
    return this.upstreamTranslateService.instant(key, params) as string;
  }

  public changeLanguage(lang: string): Observable<void> {
    return this.upstreamTranslateService.use(lang).pipe(
      map(() => undefined),
    );
  }
}
