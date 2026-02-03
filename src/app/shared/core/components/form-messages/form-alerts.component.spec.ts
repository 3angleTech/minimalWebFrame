import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormAlertsComponent } from './form-alerts.component';

describe('FormGroupErrorsComponent', () => {
  let component: FormAlertsComponent;
  let fixture: ComponentFixture<FormAlertsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormAlertsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
