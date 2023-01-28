/**
 * Provides the core shared module.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlErrorsComponent } from './components/form-control-errors/form-control-errors.component';
import { FormAlertsComponent } from './components/form-messages/form-alerts.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { IAccountService } from './services/account.interface';
import { AccountService } from './services/account.service';
import { IContextStateService } from './services/context-state.interface';
import { ContextStateService } from './services/context-state.service';
import { IJsonConverterService } from './services/json-converter.interface';
import { JsonConverterService } from './services/json-converter.service';
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
    provide: IContextStateService,
    useClass: ContextStateService,
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
      ],
    };
  }
}
