import { Injectable } from '@angular/core';

import { IContextService, INavigationService, PageUrl } from '~shared/core';

@Injectable()
export class AuthenticatedGuard {
  constructor(
    private readonly contextService: IContextService,
    private readonly navigationService: INavigationService,

  ) {}

  public async canActivate(): Promise<boolean> {
    await this.contextService.refreshUser();
    if (!this.contextService.isAuthenticated()) {
      this.navigationService.navigateToUrl(PageUrl.LOGIN_PAGE);
      return false;
    }

    return true;
  }
}
