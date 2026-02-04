import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';
import { BasePageComponent } from '~shared/core/components/base-page/base-page.component';
import { DialogConfiguration, ModalDialogComponent } from '~shared/core/components/modal-dialog/modal-dialog.component';
import { ModalDialogService } from '~shared/core/components/modal-dialog/modal-dialog.service';
import { PageTopBarComponent } from '~shared/core/components/page-top-bar/page-top-bar.component';

@Component({
  selector: 'app-dialogs-page',
  templateUrl: './dialogs-page.component.html',
  styleUrls: ['./dialogs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTopBarComponent],
})
export class DialogsPageComponent extends BasePageComponent {
  private readonly dialogService = inject(ModalDialogService);
  private readonly vcr = inject(ViewContainerRef);

  constructor() {
    super();
  }

  public openConfirmDialog() {
    const dialogConfig: DialogConfiguration = {
      title: 'GENERIC_DIALOG.CONFIRM',
      description: 'Are you sure you want perform the action?',
    };

    const dialogRef = this.dialogService.open(this.vcr, ModalDialogComponent, dialogConfig);

    dialogRef.instance.acceptEvent.subscribe(() => {
      this.dialogService.close(dialogRef);
    });

    dialogRef.instance.closeEvent.subscribe(() => {
      this.dialogService.close(dialogRef);
    });
  }

  public openWarningDialog() {
    const dialogConfig: DialogConfiguration = {
      type: 'warning',
      title: 'GENERIC_DIALOG.WARNING',
      description: 'Are you sure you want perform the action?',
    };

    const dialogRef = this.dialogService.open(this.vcr, ModalDialogComponent, dialogConfig);

    dialogRef.instance.acceptEvent.subscribe(() => {
      this.dialogService.close(dialogRef);
    });

    dialogRef.instance.closeEvent.subscribe(() => {
      this.dialogService.close(dialogRef);
    });
  }

  public openDangerDialog() {
    const dialogConfig: DialogConfiguration = {
      type: 'danger',
      title: 'GENERIC_DIALOG.ERROR',
      description: 'Are you sure you want perform the action?',
    };

    const dialogRef = this.dialogService.open(this.vcr, ModalDialogComponent, dialogConfig);

    dialogRef.instance.acceptEvent.subscribe(() => {
      this.dialogService.close(dialogRef);
    });

    dialogRef.instance.closeEvent.subscribe(() => {
      this.dialogService.close(dialogRef);
    });
  }

}
