import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ServerApi } from '../enums/server-api.enum';
import { QueryParameterValueType, UrlParameterValueType } from './uri.interface';

/**
 * Enum containing all the supported content types
 */
export enum RequestContentType {
  ApplicationJson = 'application/json',
  ApplicationWWWFormUrlEncoded = 'application/x-www-form-urlencoded',
  FormData = 'multipart/form-data',
}

export interface RequestConfig<T = unknown> {
  serverApi: ServerApi;
  queryParameters?: Record<string, QueryParameterValueType>;
  urlParameters?: Record<string, UrlParameterValueType>;
  contentType?: RequestContentType;
  body?: T;
  skipErrorHandling?: boolean;
}

export interface IWebRequestService {
  /**
   * GET resource<T>
   *
   * @param config The request configuration.
   */
  get<T>(config: RequestConfig): Observable<T>;
  /**
   * PATCH resource<T>
   *
   * @param config The request configuration.
   */
  patch<T>(config: RequestConfig): Observable<T>;
  /**
   * POST resource<T>
   *
   * @param config The request configuration.
   */
  post<T>(config: RequestConfig): Observable<T>;
  /**
   * PUT resource<T>
   *
   * @param config The request configuration.
   */
  put<T>(config: RequestConfig): Observable<T>;
  /**
   * DELETE resource<T>
   *
   * @param config The request configuration.
   */
  delete<T>(config: RequestConfig): Observable<T>;
}
export const IWebRequestService = new InjectionToken('IWebRequestService');
