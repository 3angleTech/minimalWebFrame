import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { IAccountService } from './services/account.interface';
import { AccountService } from './services/account.service';

const COMPONENTS = [
  AccountShellComponent,
  LoginComponent,
  LogoutComponent,
  PasswordForgotComponent,
  PasswordResetComponent,
];

@NgModule({
  imports: [
    CoreModule,
    AccountRoutingModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [
    {
      provide: IAccountService,
      useClass: AccountService,
    },
  ],
})
export class AccountModule { }
