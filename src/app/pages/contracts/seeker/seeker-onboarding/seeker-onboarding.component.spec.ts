import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerOnboardingComponent } from './seeker-onboarding.component';

describe('SeekerOnboardingComponent', () => {
  let component: SeekerOnboardingComponent;
  let fixture: ComponentFixture<SeekerOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
