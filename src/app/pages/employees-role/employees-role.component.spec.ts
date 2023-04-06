import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesRoleComponent } from './employees-role.component';

describe('EmployeesRoleComponent', () => {
  let component: EmployeesRoleComponent;
  let fixture: ComponentFixture<EmployeesRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
