import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

import { User } from '../data/user.do';
import { ServerApi } from '../enums/server-api.enum';
import { IWebRequestService } from './web-request.interface';
import { IJsonConverterService } from './json-converter.service';

export interface IContextService {
  currentUser: BehaviorSubject<User | undefined>;

  isAuthenticated(): boolean;
  refreshUser(): Promise<void>;
}

export const IContextService = new InjectionToken('IContextService');

/**
 * Service holding the state of the application.
 */
@Injectable()
export class ContextService implements IContextService {
  public currentUser: BehaviorSubject<User | undefined> =
    new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly webRequest: IWebRequestService,
    private readonly jsonConverter: IJsonConverterService,
  ) {
  }

  public isAuthenticated(): boolean {
    if (this.currentUser.value) {
      return true;
    }
    return this.currentUser.value !== undefined;
  }

  public async refreshUser(): Promise<void> {
    const userObs = this.webRequest.get({
      serverApi: ServerApi.AccountMe,
      skipErrorHandling: true,
    });
    try {
      const userObject = await lastValueFrom(userObs);
      const user: User = this.jsonConverter.deserialize(userObject, User);
      this.currentUser.next(user);
    } catch (err) {
      this.currentUser.next(undefined);
    }
  }
}
