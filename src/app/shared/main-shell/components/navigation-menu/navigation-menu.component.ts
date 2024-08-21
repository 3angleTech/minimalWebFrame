/**
 * Provides the main navigation menu.
 */
import { Component, OnInit } from '@angular/core';
import { IContextService, User } from '~shared/core';
import { NavigationMenuNode, NavigationMenuStructure } from './navigation-menu-node-structure';
import { navigationMenuDefinition } from './navigation-menu-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  public currentUser!: User | undefined;
  public sections: NavigationMenuNode[];
  private readonly navigationStructure: NavigationMenuStructure;

  constructor(
    private readonly contextService: IContextService,
    private readonly router: Router,
  ) {
    this.navigationStructure = new NavigationMenuStructure(navigationMenuDefinition);
    this.sections = this.navigationStructure.root.children ?? [];
  }

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }

  public isActive(node: NavigationMenuNode): boolean {
    const nodeUrl = node.baseRoute;
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const matches = this.router.url.startsWith(nodeUrl);

    return matches;
  }
}
