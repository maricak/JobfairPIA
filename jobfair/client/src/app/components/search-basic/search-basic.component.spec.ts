import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBasicComponent } from './search-basic.component';

describe('SearchBasicComponent', () => {
  let component: SearchBasicComponent;
  let fixture: ComponentFixture<SearchBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
