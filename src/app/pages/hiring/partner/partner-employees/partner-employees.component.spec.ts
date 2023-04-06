import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEmployeesComponent } from './partner-employees.component';

describe('PartnerEmployeesComponent', () => {
  let component: PartnerEmployeesComponent;
  let fixture: ComponentFixture<PartnerEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
