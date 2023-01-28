import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';
import { MinimalShellModule } from '~shared/minimal-shell';
import { SecurityModule } from '~shared/security';

import { AccountRoutingModule } from './account-routing.module';
import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginComponent } from './components/login/login.component';

const COMPONENTS = [
  AccountShellComponent,
  LoginComponent,
];

@NgModule({
  imports: [
    CoreModule,
    SecurityModule,
    MinimalShellModule,
    AccountRoutingModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [],
})
export class AccountModule { }
