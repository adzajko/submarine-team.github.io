import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentListItemComponent } from './component-list-item.component';

describe('ComponentListItemComponent', () => {
  let component: ComponentListItemComponent;
  let fixture: ComponentFixture<ComponentListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
