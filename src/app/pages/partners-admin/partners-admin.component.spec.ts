import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersAdminComponent } from './partners-admin.component';

describe('PartnersAdminComponent', () => {
  let component: PartnersAdminComponent;
  let fixture: ComponentFixture<PartnersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
