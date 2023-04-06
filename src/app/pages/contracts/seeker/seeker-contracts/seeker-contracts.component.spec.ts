import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerContractsComponent } from './seeker-contracts.component';

describe('SeekerContractsComponent', () => {
  let component: SeekerContractsComponent;
  let fixture: ComponentFixture<SeekerContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
