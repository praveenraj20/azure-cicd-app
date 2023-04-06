import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerMapComponent } from './seeker-map.component';

describe('SeekerMapComponent', () => {
  let component: SeekerMapComponent;
  let fixture: ComponentFixture<SeekerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
