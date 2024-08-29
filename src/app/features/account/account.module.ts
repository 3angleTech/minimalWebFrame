import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { LogoutPageComponent } from './pages/logout/logout-page.component';
import { PasswordForgotPageComponent } from './pages/password-forgot/password-forgot-page.component';
import { PasswordResetPageComponent } from './pages/password-reset/password-reset-page.component';
import { IAccountService } from './services/account.interface';
import { AccountService } from './services/account.service';

const COMPONENTS = [
  AccountShellComponent,
  LoginPageComponent,
  LogoutPageComponent,
  PasswordForgotPageComponent,
  PasswordResetPageComponent,
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
