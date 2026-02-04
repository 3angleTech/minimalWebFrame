import { inject, Injectable } from '@angular/core';
import { isNil, isString } from 'lodash';

import { ServerApi } from '../enums/server-api.enum';
import { EnvironmentService } from '../environment.service';

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

@Injectable({
  providedIn: 'root',
})
export class UriService implements IURIService {
  private readonly environmentService = inject(EnvironmentService);

  private readonly URL_TEMPLATE_REGEX: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

  public buildUrl(
    serverApi: ServerApi,
    queryParameters: Record<string, QueryParameterValueType> | undefined,
    urlParameters: Record<string, UrlParameterValueType> | undefined,
  ): string {
    const baseUrl = this.getBaseUrl(serverApi, urlParameters);

    const queryString = this.buildParamQueryString(queryParameters);
    let url = baseUrl;
    if (queryString !== '') {
      if (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1);
      }
      url += queryString;
    }

    return url;
  }

  private getBaseUrl(serverApi: ServerApi, urlParameters: Record<string, UrlParameterValueType> | undefined): string {
    const urlTemplate = `${this.environmentService.apiBaseUrl}${serverApi}`;

    return urlTemplate.replace(this.URL_TEMPLATE_REGEX,
      (formatItem: string, actualKey: string): string => {
        if (!urlParameters || !urlParameters[actualKey]) {
          return '';
        }
        return `${urlParameters[actualKey]}`;
      });
  }

  private buildParamQueryString(queryParameters: Record<string, QueryParameterValueType> | undefined): string {
    if (isNil(queryParameters)) {
      return '';
    }

    const paramKeyList: string[] = this.getQueryParametersWithValue(queryParameters);
    if (paramKeyList.length === 0) {
      return '';
    }

    let queryString = '?';
    paramKeyList.forEach((pKey: string, pKeyIndex: number): void => {
      let token = '';
      const pValue = queryParameters[pKey];
      if (pValue instanceof Array) {
        pValue.forEach((item: UrlParameterValueType, pValueIndex: number) => {
          token += `${pKey}=${encodeURIComponent(item)}`;
          token += pValueIndex !== pValue.length - 1 ? '&' : '';
        });
      } else {
        token = `${pKey}=${encodeURIComponent(pValue)}`;
      }

      queryString += token;
      queryString += pKeyIndex !== paramKeyList.length - 1 ? '&' : '';
    });

    return queryString;
  }

  private getQueryParametersWithValue(urlParameters: Record<string, QueryParameterValueType>): string[] {
    const emptyString = '';
    const paramKeyList = Object.keys(urlParameters);
    const filteredParamKeyList: string[] = [];

    paramKeyList.forEach((pKey: string): void => {
      const value = urlParameters[pKey];
      if (!isNil(value) && !(isString(value) && value.trim() === emptyString)) {
        filteredParamKeyList.push(pKey);
      }
    });

    return filteredParamKeyList;
  }
}
