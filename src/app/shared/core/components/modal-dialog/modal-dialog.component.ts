import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDialogComponent {
  @Input() configuration!: DialogConfiguration;
  @Output() acceptEvent = new EventEmitter<void>();
  @Output() closeEvent = new EventEmitter<void>();

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

  public acceptClickHandler() {
    this.acceptEvent.emit();
  }

  public closeClickHandler() {
    this.closeEvent.emit();
  }
}
