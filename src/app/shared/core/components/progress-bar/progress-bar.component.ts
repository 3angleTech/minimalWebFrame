import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';
import { ITranslateService } from '~shared/core';

@Component({
  selector: 'app-progress-bar',
  styleUrls: ['./progress-bar.component.scss'],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnChanges {
  @Input()
  public infoText: string = 'GENERAL.LOADING_PAGE';

  @HostBinding('attr.aria-valuetext')
  public ariaValuetext: string | undefined = undefined;

  @HostBinding('attr.aria-busy')
  public readonly ariaBusy: string = 'true';

  @HostBinding('attr.aria-live')
  public readonly ariaLive: string = 'polite';

  @HostBinding('attr.role')
  public readonly ariaRole: string = 'progressbar';

  constructor(
    public readonly translateService: ITranslateService,
  ) {
  }

  public ngOnChanges(): void {
    this.ariaValuetext = this.infoText ? this.translateService.translate(this.infoText) : undefined;
  }
}
