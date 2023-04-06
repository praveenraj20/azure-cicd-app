import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerHistoryComponent } from './partner-history.component';

describe('PartnerHistoryComponent', () => {
  let component: PartnerHistoryComponent;
  let fixture: ComponentFixture<PartnerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
