import { InjectionToken } from '@angular/core';

import { ServerApi } from '../enums/server-api.enum';

/**
 * Custom type for the URL parameters' values
 */
export type UrlParameterValueType = string | number | boolean;

/**
 * Custom type for the query parameters' values
 */
export type QueryParameterValueType = string | number | boolean | string[] | number[];

export interface IURIService {
  /**
   * Builds the API endpoint url
   *
   * @param serverApi Server api
   * @param queryParameters List of all the query parameters which should be set.
   * @param urlParameters List of all the url parameters which should be set.
   */
  buildUrl(
    serverApi: ServerApi,
    queryParameters: Record<string, QueryParameterValueType> | undefined,
    urlParameters: Record<string, UrlParameterValueType> | undefined,
  ): string;
}
export const IURIService = new InjectionToken('IURIService');
