import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPhasesComponent } from './partner-phases.component';

describe('PartnerPhasesComponent', () => {
  let component: PartnerPhasesComponent;
  let fixture: ComponentFixture<PartnerPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerPhasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
