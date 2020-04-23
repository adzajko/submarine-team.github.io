import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewElementComponent } from './review-element.component';

describe('ReviewElementComponent', () => {
  let component: ReviewElementComponent;
  let fixture: ComponentFixture<ReviewElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
