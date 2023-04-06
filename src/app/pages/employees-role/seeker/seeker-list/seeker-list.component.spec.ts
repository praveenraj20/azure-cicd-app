import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerListComponent } from './seeker-list.component';

describe('SeekerListComponent', () => {
  let component: SeekerListComponent;
  let fixture: ComponentFixture<SeekerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
