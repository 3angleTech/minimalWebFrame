import { Injectable, InjectionToken } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';

/**
 * Service for common navigation operations.
 */
export interface INavigationService {
  /**
   * Navigate to target url.
   *
   * @param url The target url.
   * @param extras An object containing properties that modify the navigation strategy.
   */
  navigateToUrl(url: string | UrlTree, extras?: NavigationExtras): void;
}
export const INavigationService = new InjectionToken('INavigationService');

@Injectable()
export class NavigationService implements INavigationService {
  constructor(
    private readonly router: Router,
  ) {}

  public navigateToUrl(url: string | UrlTree, extras?: NavigationExtras): void {
    this.router.navigateByUrl(url, extras);
  }
}
