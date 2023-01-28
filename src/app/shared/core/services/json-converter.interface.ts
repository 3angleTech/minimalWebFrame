import { InjectionToken } from '@angular/core';

export interface IJsonConverterService {
  serialize<T>(classReference: T): unknown;
  deserialize<T>(json: unknown, classReference: new () => object): T;
}
export const IJsonConverterService = new InjectionToken('IJsonConverterService');
