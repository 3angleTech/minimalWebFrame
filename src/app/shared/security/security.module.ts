import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AnonymousGuard } from './guards/anonymous.guard';

@NgModule({
  imports: [
    CommonModule,
  ],
})
export class SecurityModule {
  public static forRoot(): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        AnonymousGuard,
      ],
    };
  }
}
