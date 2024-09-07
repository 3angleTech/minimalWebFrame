import { Injectable } from '@angular/core';

import { ContextService, NavigationService, PageUrl } from '~shared/core';

@Injectable()
export class AnonymousGuard {
  constructor(
    private readonly contextService: ContextService,
    private readonly navigationService: NavigationService,
  ) {}

  public async canActivate(): Promise<boolean> {
    await this.contextService.refreshUser();
    if (this.contextService.isAuthenticated()) {
      this.navigationService.navigateToUrl(PageUrl.HOME_PAGE);
      return false;
    }

    return true;
  }
}
