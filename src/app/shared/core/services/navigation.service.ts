import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { INavigationService } from './navigation.interface';

@Injectable()
export class NavigationService implements INavigationService {
  constructor(
    private readonly router: Router,
  ) {}

  public navigateToUrl(url: string | UrlTree, extras?: NavigationExtras): void {
    this.router.navigateByUrl(url, extras);
  }
}
