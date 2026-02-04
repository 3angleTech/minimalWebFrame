import { Component, inject, OnInit } from '@angular/core';
import { ContextService, User } from '~shared/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';
import { PageTopBarComponent } from '~shared/core/components/page-top-bar/page-top-bar.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  imports: [PageTopBarComponent],
})
export class ProfilePageComponent extends BasePageComponent implements OnInit {
  public currentUser!: User | undefined;

  private readonly contextService = inject(ContextService);

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }
}
