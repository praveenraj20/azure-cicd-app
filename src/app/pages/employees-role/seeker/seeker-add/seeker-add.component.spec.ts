import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerAddComponent } from './seeker-add.component';

describe('SeekerAddComponent', () => {
  let component: SeekerAddComponent;
  let fixture: ComponentFixture<SeekerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
