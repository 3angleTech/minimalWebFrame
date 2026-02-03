import { inject, Injectable } from '@angular/core';

import { ContextService, NavigationService, PageUrl } from '~shared/core';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard {
  private readonly contextService = inject(ContextService);
  private readonly navigationService = inject(NavigationService);

  public async canActivate(): Promise<boolean> {
    await this.contextService.refreshUser();
    if (this.contextService.isAuthenticated()) {
      this.navigationService.navigateToUrl(PageUrl.HOME_PAGE);
      return false;
    }

    return true;
  }
}
