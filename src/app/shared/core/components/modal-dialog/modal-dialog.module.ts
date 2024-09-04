import { NgModule } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalDialogService } from './modal-dialog.service';

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
    ModalDialogService,
  ],
})
export class ModalDialogsModule {
}
