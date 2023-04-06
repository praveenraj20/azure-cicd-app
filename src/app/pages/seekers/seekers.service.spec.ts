import { TestBed } from '@angular/core/testing';

import { SeekersService } from './seekers.service';

describe('SeekersService', () => {
  let service: SeekersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
