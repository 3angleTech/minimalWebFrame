import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { IContextService, INavigationService, PageUrl } from '~shared/core';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(
    private readonly contextService: IContextService,
    private readonly navigationService: INavigationService,
  ) {}

  public async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.contextService.isAuthenticated();
    if (isAuthenticated) {
      this.navigationService.navigateToUrl(PageUrl.HOME_PAGE);
      return false;
    }

    return true;
  }
}
