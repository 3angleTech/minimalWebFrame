/**
 * Provides the core shared module.
 */
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlErrorsComponent } from './components/form-control-errors/form-control-errors.component';
import { FormAlertsComponent } from './components/form-messages/form-alerts.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AccountService, IAccountService } from './services/account.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService, IAuthService } from './services/auth.service';
import { ContextService, IContextService } from './services/context.service';
import { IJsonConverterService, JsonConverterService } from './services/json-converter.service';
import { INavigationService, NavigationService } from './services/navigation.service';
import { INotificationService, NotificationService } from './services/notification.service';
import { ITranslateService, TranslateService } from './services/translate.service';
import { IURIService } from './services/uri.interface';
import { UriService } from './services/uri.service';
import { IWebRequestService } from './services/web-request.interface';
import { WebRequestService } from './services/web-request.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  FontAwesomeModule,
];

const COMPONENTS = [
  ProgressBarComponent,
  FormControlErrorsComponent,
  FormAlertsComponent,
];

@NgModule({
  exports: [
    MODULES,
    COMPONENTS,
  ],
  declarations: [
    COMPONENTS,
  ],
  imports: [MODULES],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
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
