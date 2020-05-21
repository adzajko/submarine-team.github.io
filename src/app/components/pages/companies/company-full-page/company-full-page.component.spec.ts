import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFullPageComponent } from './company-full-page.component';

describe('CompanyFullPageComponent', () => {
  let component: CompanyFullPageComponent;
  let fixture: ComponentFixture<CompanyFullPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFullPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
