import { Component, OnInit } from '@angular/core';
import { IContextService, User } from '~shared/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfileComponent implements OnInit {
  public currentUser!: User | undefined;

  constructor(
    private readonly contextService: IContextService,
  ) {}

  public ngOnInit(): void {
    this.currentUser = this.contextService.currentUser.value;
  }
}
