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
import { AccountService } from './services/account.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { ContextService, IContextService } from './services/context.service';
import { JsonConverterService } from './services/json-converter.service';
import { NavigationService } from './services/navigation.service';
import { INotificationService, NotificationService } from './services/notification.service';
import { TranslateService } from './services/translate.service';
import { UriService } from './services/uri.service';
import { WebRequestService } from './services/web-request.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const SERVICES: Provider[] = [
  {
    provide: IContextService,
    useClass: ContextService,
  },
  TranslateService,
  JsonConverterService,
  UriService,
  WebRequestService,
  {
    provide: INotificationService,
    useClass: NotificationService,
  },
  AccountService,
  NavigationService,
  AuthService,
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
