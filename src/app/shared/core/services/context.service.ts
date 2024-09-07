import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

import { User } from '../data/user.do';
import { ServerApi } from '../enums/server-api.enum';
import { JsonConverterService } from './json-converter.service';
import { WebRequestService } from './web-request.service';

export interface IContextService {
  currentUser: BehaviorSubject<User | undefined>;

  isAuthenticated(): boolean;
  refreshUser(): Promise<void>;
}

/**
 * Service holding the state of the application.
 */
@Injectable()
export class ContextService implements IContextService {
  public currentUser: BehaviorSubject<User | undefined> =
    new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly webRequest: WebRequestService,
    private readonly jsonConverter: JsonConverterService,
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
