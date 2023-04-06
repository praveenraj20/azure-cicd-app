import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureJobNotificationsComponent } from './feature-job-notifications.component';

describe('FeatureJobNotificationsComponent', () => {
  let component: FeatureJobNotificationsComponent;
  let fixture: ComponentFixture<FeatureJobNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureJobNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureJobNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
