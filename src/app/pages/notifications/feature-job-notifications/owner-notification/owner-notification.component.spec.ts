import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerNotificationComponent } from './owner-notification.component';

describe('OwnerNotificationComponent', () => {
  let component: OwnerNotificationComponent;
  let fixture: ComponentFixture<OwnerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
