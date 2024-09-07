import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IWebRequestService, RequestConfig, RequestContentType } from './web-request.interface';
import { UriService } from './uri.service';

@Injectable()
export class WebRequestService implements IWebRequestService {
  constructor(
    private readonly uriService: UriService,
    private readonly http: HttpClient,
  ) { }

  public get<T>(config: RequestConfig): Observable<T> {
    return this.http.get<T>(this.getUrl(config), {
      headers: this.getHeaders(config),
    });
  }

  public patch<T>(config: RequestConfig): Observable<T> {
    return this.http.patch<T>(this.getUrl(config), config.body, {
      headers: this.getHeaders(config),
    });
  }

  public post<T>(config: RequestConfig): Observable<T> {
    return this.http.post<T>(this.getUrl(config), config.body, {
      headers: this.getHeaders(config),
    });
  }

  public put<T>(config: RequestConfig): Observable<T> {
    return this.http.put<T>(this.getUrl(config), config.body, {
      headers: this.getHeaders(config),
    });
  }

  public delete<T>(config: RequestConfig): Observable<T> {
    return this.http.delete<T>(this.getUrl(config), {
      headers: this.getHeaders(config),
    });
  }

  private getUrl(config: RequestConfig): string {
    return this.uriService.buildUrl(config.serverApi, config.queryParameters, config.urlParameters);
  }

  private getHeaders(config: RequestConfig): HttpHeaders {
    const contentType = (config.contentType) ? config.contentType : RequestContentType.ApplicationJson;

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', contentType);

    return headers;
  }
}
