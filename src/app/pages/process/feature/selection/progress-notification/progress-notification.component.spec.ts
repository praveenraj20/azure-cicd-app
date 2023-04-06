import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressNotificationComponent } from './progress-notification.component';

describe('ProgressNotificationComponent', () => {
  let component: ProgressNotificationComponent;
  let fixture: ComponentFixture<ProgressNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
