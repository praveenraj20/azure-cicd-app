import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAdminComponent } from './preview-admin.component';

describe('PreviewAdminComponent', () => {
  let component: PreviewAdminComponent;
  let fixture: ComponentFixture<PreviewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
