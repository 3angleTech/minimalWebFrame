import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

import { User } from '../data/user.do';
import { ServerApi } from '../enums/server-api.enum';
import { IContextService } from './context.interface';
import { IJsonConverterService } from './json-converter.interface';
import { IWebRequestService } from './web-request.interface';

/**
 * Service holding the state of the application.
 */
@Injectable()
export class ContextService implements IContextService {
  public currentUser!: BehaviorSubject<User | undefined>;

  constructor(
    private readonly webRequest: IWebRequestService,
    private readonly jsonConverter: IJsonConverterService,
  ) {
    this.currentUser = new BehaviorSubject<User | undefined>(undefined);
  }

  public async isAuthenticated(): Promise<boolean> {
    if (this.currentUser?.value) {
      return true;
    }

    const userObs = this.webRequest.get({
      serverApi: ServerApi.AccountMe,
      skipErrorHandling: true,
    });
    try {
      const userObject = await lastValueFrom(userObs);
      const user: User = this.jsonConverter.deserialize(userObject, User);
      this.currentUser.next(user);
      return true;
    } catch (err) {
      this.currentUser.next(undefined);
      return false;
    }
  }
}
