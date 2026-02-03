import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

export enum FormAlertType {
  Success,
  Warning,
  Error,
}

export interface FormAlert {
  message: string;
  messageParams?: Record<string, string | number>;
  type: FormAlertType;
}

@Component({
  selector: 'app-form-alerts',
  styleUrls: ['./form-alerts.component.scss'],
  templateUrl: './form-alerts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, TranslateModule],
})
export class FormAlertsComponent {
  @Input()
  public alerts: FormAlert[] | undefined;

  @HostBinding('attr.aria-live')
  public readonly ariaLive: string = 'assertive';

  @HostBinding('attr.role')
  public readonly ariaRole: string = 'alert';

  public get alertType(): typeof FormAlertType {
    return FormAlertType;
  }

  public deleteAlert(index: number): void {
    this.alerts?.splice(index, 1);
  }
}
