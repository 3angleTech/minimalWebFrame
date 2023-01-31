import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const COMPONENTS = [
  AccountShellComponent,
  LoginComponent,
  LogoutComponent,
];

@NgModule({
  imports: [
    CoreModule,
    AccountRoutingModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [],
})
export class AccountModule { }
