/**
 * Provides the core shared module.
 */
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlErrorsComponent } from './components/form-control-errors/form-control-errors.component';
import { FormAlertsComponent } from './components/form-messages/form-alerts.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { IAccountService } from './services/account.interface';
import { AccountService } from './services/account.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { IAuthService } from './services/auth.interface';
import { AuthService } from './services/auth.service';
import { IContextService } from './services/context.interface';
import { ContextService } from './services/context.service';
import { IJsonConverterService } from './services/json-converter.interface';
import { JsonConverterService } from './services/json-converter.service';
import { INavigationService } from './services/navigation.interface';
import { NavigationService } from './services/navigation.service';
import { INotificationService } from './services/notification.interface';
import { NotificationService } from './services/notification.service';
import { ITranslateService } from './services/translate.interface';
import { TranslateService } from './services/translate.service';
import { IURIService } from './services/uri.interface';
import { UriService } from './services/uri.service';
import { IWebRequestService } from './services/web-request.interface';
import { WebRequestService } from './services/web-request.service';

const SERVICES: Provider[] = [
  {
    provide: IContextService,
    useClass: ContextService,
  },
  {
    provide: ITranslateService,
    useClass: TranslateService,
  },
  {
    provide: IJsonConverterService,
    useClass: JsonConverterService,
  },
  {
    provide: IURIService,
    useClass: UriService,
  },
  {
    provide: IWebRequestService,
    useClass: WebRequestService,
  },
  {
    provide: INotificationService,
    useClass: NotificationService,
  },
  {
    provide: IAccountService,
    useClass: AccountService,
  },
  {
    provide: INavigationService,
    useClass: NavigationService,
  },
  {
    provide: IAuthService,
    useClass: AuthService,
  },
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  TranslateModule,
];

const COMPONENTS = [
  ProgressBarComponent,
  FormControlErrorsComponent,
  FormAlertsComponent,
];

@NgModule({
  imports: [
    MODULES,
    HttpClientModule,
  ],
  exports: [
    MODULES,
    COMPONENTS,
  ],
  declarations: [
    COMPONENTS,
  ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        SERVICES,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
