import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export interface IJsonConverterService {
  serialize<T>(classReference: T): unknown;
  deserialize<T>(json: unknown, classReference: new () => object): T;
}

@Injectable()
export class JsonConverterService implements IJsonConverterService {

  public deserialize<T>(json: unknown, classReference: new () => object): T {
    return plainToInstance(classReference, json) as unknown as T;
  }

  public serialize<T>(object: T): unknown {
    return instanceToPlain(object);
  }
}
