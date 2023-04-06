import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTimesheetComponent } from './owner-timesheet.component';

describe('OwnerTimesheetComponent', () => {
  let component: OwnerTimesheetComponent;
  let fixture: ComponentFixture<OwnerTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
