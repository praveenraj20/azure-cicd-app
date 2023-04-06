import { TestBed } from '@angular/core/testing';

import { EmployeesRoleService } from './employees-role.service';

describe('EmployeesRoleService', () => {
  let service: EmployeesRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
