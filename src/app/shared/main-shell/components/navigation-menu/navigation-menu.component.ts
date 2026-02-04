/**
 * Provides the main navigation menu.
 */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ContextService, User } from '~shared/core';
import { navigationMenuDefinition } from './navigation-menu-config';
import { NavigationMenuNode, NavigationMenuStructure } from './navigation-menu-node-structure';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
})
export class NavigationMenuComponent implements OnInit {
  public currentUser!: User | undefined;
  public sections: NavigationMenuNode[];
  private readonly navigationStructure: NavigationMenuStructure;

  private readonly contextService = inject(ContextService);
  private readonly router = inject(Router);

  faQuestion = faQuestion;

  constructor(
  ) {
    this.navigationStructure = new NavigationMenuStructure(navigationMenuDefinition);
    this.sections = this.navigationStructure.root.children ?? [];
  }

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }

  public isActive(node: NavigationMenuNode): boolean {
    const nodeUrl = node.baseRoute;
    const matches = this.router.url.startsWith(nodeUrl);

    return matches;
  }
}
