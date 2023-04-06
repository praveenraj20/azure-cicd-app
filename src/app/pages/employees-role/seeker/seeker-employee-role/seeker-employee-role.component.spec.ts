import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerEmployeeRoleComponent } from './seeker-employee-role.component';

describe('SeekerEmployeeRoleComponent', () => {
  let component: SeekerEmployeeRoleComponent;
  let fixture: ComponentFixture<SeekerEmployeeRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerEmployeeRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerEmployeeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
