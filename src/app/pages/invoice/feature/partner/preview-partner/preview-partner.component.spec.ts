import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPartnerComponent } from './preview-partner.component';

describe('PreviewPartnerComponent', () => {
  let component: PreviewPartnerComponent;
  let fixture: ComponentFixture<PreviewPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
