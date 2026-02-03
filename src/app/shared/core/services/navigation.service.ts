import { inject, Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements NavigationService {
  private readonly router = inject(Router);

  public navigateToUrl(url: string | UrlTree, extras?: NavigationExtras): void {
    this.router.navigateByUrl(url, extras);
  }
}
