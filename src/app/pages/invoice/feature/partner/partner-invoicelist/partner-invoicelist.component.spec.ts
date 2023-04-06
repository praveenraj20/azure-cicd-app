import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerInvoicelistComponent } from './partner-invoicelist.component';

describe('PartnerInvoicelistComponent', () => {
  let component: PartnerInvoicelistComponent;
  let fixture: ComponentFixture<PartnerInvoicelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerInvoicelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerInvoicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
