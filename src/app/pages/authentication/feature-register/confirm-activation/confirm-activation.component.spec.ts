import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActivationComponent } from './confirm-activation.component';

describe('ConfirmActivationComponent', () => {
  let component: ConfirmActivationComponent;
  let fixture: ComponentFixture<ConfirmActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
