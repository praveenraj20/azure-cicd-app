import { TestBed } from '@angular/core/testing';

import { PartnersAdminService } from './partners-admin.service';

describe('PartnersAdminService', () => {
  let service: PartnersAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnersAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
