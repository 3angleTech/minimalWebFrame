/**
 * Provides a helper component that can be used to display form control errors.
 */
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroupDirective, UntypedFormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form-control-errors',
  templateUrl: './form-control-errors.component.html',
  styleUrls: ['./form-control-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class FormControlErrorsComponent implements DoCheck, OnInit {
  @Input()
  public formControlPath!: string;

  @Input()
  public namespace!: string;

  @HostBinding('attr.aria-live')
  public readonly ariaLive: string = 'assertive';

  @HostBinding('attr.role')
  public readonly ariaRole: string = 'alert';

  public controlErrors$!: Observable<string[] | undefined>;

  protected formControl!: UntypedFormControl;

  /**
   * Touch events are not emitted by form controls, this emit an event when a
   * form control is first touched.
   *
   * TODO: Remove once the angular issue #10887 has been fixed.
   *
   * @see https://github.com/angular/angular/issues/10887
   */
  protected formControlTouchedChanges: EventEmitter<void> = new EventEmitter<void>();
  protected formControlTouchedChanged: boolean = false;

  constructor(
    @Host()
    protected formGroupDirective: FormGroupDirective,
  ) {
  }

  public ngOnInit(): void {
    this.formControl = this.formGroupDirective.form.get(this.formControlPath) as UntypedFormControl;
    if (!this.formControl) {
      return;
    }

    this.controlErrors$ = merge(
      this.formGroupDirective.ngSubmit,
      this.formControl.valueChanges,
      this.formControlTouchedChanges,
    ).pipe(
      map((): string[] | undefined => {
        if (this.formControl.errors) {
          return Object.keys(this.formControl.errors).map((errorKey: string) => {
            return `${this.namespace}.${errorKey}`;
          });
        }

        return undefined;
      }),
    );
  }

  /**
   * NOTE: This method should be kept as fast as possible.
   *
   * TODO: Remove once the angular issue #10887 has been fixed.
   *
   * @see https://github.com/angular/angular/issues/10887
   */
  public ngDoCheck(): void {
    // Show errors when a component is first touched.
    if (this.formControl.touched && !this.formControlTouchedChanged) {
      this.formControlTouchedChanged = true;
      this.formControlTouchedChanges.emit();
    }
  }

}
