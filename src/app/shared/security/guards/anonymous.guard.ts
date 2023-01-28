import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { IContextStateService, PageUrl } from '~shared/core';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(
    private readonly stateService: IContextStateService,
    private readonly router: Router,
  ) {
  }

  public canActivate(): boolean | UrlTree {
    if (this.stateService.isAuthenticated()) {
      return this.router.parseUrl(PageUrl.PROFILE_PAGE);
    }

    return true;
  }
}
