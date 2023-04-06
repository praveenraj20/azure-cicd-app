import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerPhasesComponent } from './seeker-phases.component';

describe('SeekerPhasesComponent', () => {
  let component: SeekerPhasesComponent;
  let fixture: ComponentFixture<SeekerPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerPhasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
