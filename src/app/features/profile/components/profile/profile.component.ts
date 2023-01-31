import { Component, OnInit } from '@angular/core';
import { IContextService, User } from '~shared/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
