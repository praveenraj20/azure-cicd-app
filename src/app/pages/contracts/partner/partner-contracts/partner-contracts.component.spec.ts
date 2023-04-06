import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerContractsComponent } from './partner-contracts.component';

describe('PartnerContractsComponent', () => {
  let component: PartnerContractsComponent;
  let fixture: ComponentFixture<PartnerContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
