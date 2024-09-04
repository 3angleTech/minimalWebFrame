import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ConfirmDialogComponent, DialogConfiguration } from '~shared/dialogs/confirm/confirm-dialog.component';
import { DialogService } from '~shared/dialogs/dialog.service';

@Component({
  selector: 'app-dialogs-page',
  templateUrl: './dialogs-page.component.html',
  styleUrls: ['./dialogs-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogsPageComponent {
  @ViewChild('dialogContainer', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  constructor(
    private readonly dialogService: DialogService,
    private vcr: ViewContainerRef,
  ) {

  }

  public openConfirmDialog() {
    const dialogConfig: DialogConfiguration = {
      title: 'GENERIC_DIALOG.CONFIRM',
      description: 'Are you sure you want perform the action?',
    };

    this.dialogService.open(this.vcr, ConfirmDialogComponent, dialogConfig);
  }
}
