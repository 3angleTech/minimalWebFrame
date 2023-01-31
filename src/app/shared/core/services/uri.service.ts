import { Injectable } from '@angular/core';
import { isNil, isString } from 'lodash';

import { environment } from '~environment/environment';

import { ServerApi } from '../enums/server-api.enum';

import { IURIService, QueryParameterValueType, UrlParameterValueType } from './uri.interface';

@Injectable()
export class UriService implements IURIService {
  private readonly URL_TEMPLATE_REGEX: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

  constructor() { }

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
    const urlTemplate = `${environment.apiBaseUrl}${serverApi}`;

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
          token += (pValueIndex !== pValue.length - 1) ? '&' : '';
        });
      } else {
        token = `${pKey}=${encodeURIComponent(pValue)}`;
      }

      queryString += token;
      queryString += (pKeyIndex !== paramKeyList.length - 1) ? '&' : '';
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
