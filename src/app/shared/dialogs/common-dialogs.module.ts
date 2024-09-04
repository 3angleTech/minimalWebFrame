import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    ConfirmDialogComponent,
  ],
  providers: [
    DialogService,
  ],
})
export class CommonDialogsModule {
}
