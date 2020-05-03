import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFullComponent } from './review-full.component';

describe('ReviewFullComponent', () => {
  let component: ReviewFullComponent;
  let fixture: ComponentFixture<ReviewFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
