import { NgModule } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [
    ModalDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    ModalDialogComponent,
  ],
  providers: [
    DialogService,
  ],
})
export class CommonDialogsModule {
}
