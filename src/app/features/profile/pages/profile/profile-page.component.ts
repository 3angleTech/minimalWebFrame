import { Component, OnInit } from '@angular/core';
import { IContextService, User } from '~shared/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfileComponent extends BasePageComponent implements OnInit {
  public currentUser!: User | undefined;

  constructor(
    private readonly contextService: IContextService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }
}
