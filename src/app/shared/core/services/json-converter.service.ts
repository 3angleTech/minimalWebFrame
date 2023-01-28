import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { IJsonConverterService } from './json-converter.interface';

@Injectable()
export class JsonConverterService implements IJsonConverterService {

  public deserialize<T>(json: unknown, classReference: new () => object): T {
    return plainToInstance(classReference, json, { excludeExtraneousValues: true }) as unknown as T;
  }

  public serialize<T>(object: T): unknown {
    return instanceToPlain(object);
  }
}
