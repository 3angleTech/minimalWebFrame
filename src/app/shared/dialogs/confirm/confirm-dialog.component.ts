import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface DialogConfiguration {
  type?: 'confirm' | 'warning' | 'danger';
  title: string;
  description: string;
  actions?: {
    acceptButton: string;
    cancelButton: string;
  }
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  @Input() configuration!: DialogConfiguration;

  public theamingClass: 'dialog--confirm' | 'dialog--warning' | 'dialog--danger' = 'dialog--confirm';

  public ngOnInit() {
    if (!this.configuration.title && this.configuration.type === 'confirm') {
      this.configuration.title = 'GENERIC_DIALOG.CONFIRM';
    }

    if (!this.configuration.actions) {
      this.addFallbackActionsLabels();
    }

    switch (this.configuration.type) {
      case 'confirm':
        this.theamingClass = 'dialog--confirm';
        break;
      case 'warning':
        this.theamingClass = 'dialog--warning';
        break;
      case 'danger':
        this.theamingClass = 'dialog--danger';
        break;
    }
  }

  private addFallbackActionsLabels() {
    this.configuration.actions = {
      acceptButton: 'BUTTONS.OK',
      cancelButton: 'BUTTONS.CANCEL',
    };
  }

  public closeModal() {
  }
}
