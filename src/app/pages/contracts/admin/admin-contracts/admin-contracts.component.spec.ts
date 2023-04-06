import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContractsComponent } from './admin-contracts.component';

describe('AdminContractsComponent', () => {
  let component: AdminContractsComponent;
  let fixture: ComponentFixture<AdminContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
