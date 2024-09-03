import { NgModule } from '@angular/core';
import { PageTopBarComponent } from './page-top-bar.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageTopBarComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    PageTopBarComponent,
  ],
  providers: [],
})
export class PageTopBarModule {
}
