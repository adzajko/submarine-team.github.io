import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullListComponent } from './full-list.component';

describe('FullListComponent', () => {
  let component: FullListComponent;
  let fixture: ComponentFixture<FullListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
