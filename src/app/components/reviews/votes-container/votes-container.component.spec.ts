import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesContainerComponent } from './votes-container.component';

describe('VotesContainerComponent', () => {
  let component: VotesContainerComponent;
  let fixture: ComponentFixture<VotesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
