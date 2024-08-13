/**
 * Provides the main navigation menu.
 */
import { Component, OnInit } from '@angular/core';
import { IContextService, User } from '~shared/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  public currentUser!: User | undefined;

  constructor(
    private readonly contextService: IContextService,
  ) {}

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }
}
