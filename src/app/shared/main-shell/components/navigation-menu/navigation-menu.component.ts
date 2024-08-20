/**
 * Provides the main navigation menu.
 */
import { Component, OnInit } from '@angular/core';
import { IContextService, User } from '~shared/core';
import { NavigationMenuStructure } from './navigation-menu-node-structure';
import { navigationMenuDefinition } from './navigation-menu-config';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  public currentUser!: User | undefined;
  public navigationStructure: NavigationMenuStructure;

  constructor(
    private readonly contextService: IContextService,
  ) {

    this.navigationStructure = new NavigationMenuStructure(navigationMenuDefinition);
  }

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }
}
